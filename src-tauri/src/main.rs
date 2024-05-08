// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::Path};
use std::fs::read_to_string;
use csv::ReaderBuilder;
use rusqlite::{Connection, Result, params};
use serde::{Deserialize, Serialize};
use tauri::api::path::data_dir;
use std::error::Error;
use serde_json::{Map, Value};

fn connect_to_database(path: &str) -> Result<Connection, rusqlite::Error> {

  // let config_dir = data_dir().expect("Failed to get config dir!");
  // let config_path = config_dir.join("db_config.json");

  // let config: Value = serde_json::from_str(&fs::read_to_string(config_path).unwrap()).unwrap();
  // let db_path = config["database_path"].as_str().unwrap_or("default_path.sqlite3");

  let conn = Connection::open(path)?;

  Ok(conn)
}

fn create_tables_in_database(path: &str) -> Result<()> {

  // Create a connection.
  let conn = connect_to_database(path)?;

  // Create tables if needed.
  conn.execute(
    "CREATE TABLE IF NOT EXISTS hiragana (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hiragana TEXT NOT NULL,
      english TEXT
    )",
    []
  )?;

  conn.execute(
    "CREATE TABLE IF NOT EXISTS katakana (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      katakana TEXT NOT NULL,
      english TEXT
    )",
    []
  )?;

  conn.execute(
    "CREATE TABLE IF NOT EXISTS phrase (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      japanese_phrase TEXT,
      romaji TEXT,
      english_translation TEXT,
      breakdown TEXT
    )",
    []
  )?;

  Ok(())
}

fn load_csv(csv_path: &Path) -> Result<String, String>{
  
  if !csv_path.exists() {
    return Err(format!("CSV file not found at: {}", csv_path.display()));
  } 

  let csv_data = read_to_string(csv_path).map_err(|err| err.to_string())?; 
  Ok(csv_data)
}

fn is_table_empty( table_name: &str, path: &str) -> Result<bool, rusqlite::Error> {
  let conn = connect_to_database(path)?;

  let query = format!("SELECT COUNT(*) FROM {}", table_name);

  let mut stmt = conn.prepare(&query)?;
  let count: i64 = stmt.query_row([], |row| row.get(0))?;
  
  Ok(count == 0)
}

fn seed_database_with_hiragana(csv_data: String, path: &str) -> Result<()> {
  let mut conn = connect_to_database(path)?;

  let mut reader = ReaderBuilder::new().from_reader(csv_data.as_bytes());

  let transaction = conn.transaction()?;

  for result in reader.records() { 
    match result {
      Ok(record) => {

        transaction.execute(
          "INSERT INTO hiragana (hiragana, english) VALUES (?1, ?2)",
          params![record.get(0).unwrap(), record.get(1).unwrap()]
        )?;  
      }
      Err(err)=> {
        eprintln!("Error processing CSV record: {}", err); 
      }
    }
  }
  
  transaction.commit()?;

  Ok(())
}

fn seed_database_with_katakana(csv_data: String, path: &str) -> Result<()> {
  let mut conn = connect_to_database(path)?;

  let mut reader = ReaderBuilder::new().from_reader(csv_data.as_bytes());

  let transaction = conn.transaction()?;

  for result in reader.records() { 
    match result {
      Ok(record) => {

        transaction.execute(
          "INSERT INTO katakana (katakana, english) VALUES (?1, ?2)",
          params![record.get(0).unwrap(), record.get(1).unwrap()]
        )?;  
      }
      Err(err)=> {
        eprintln!("Error processing CSV record: {}", err); 
      }
    }
  }
  
  transaction.commit()?;

  Ok(())
}

fn initialize_new_database(path: &str) -> Result<(), Box<dyn Error>> {

  // Database initialization.
  create_tables_in_database(path)?;

  // Check and seed "hiragana"
  if is_table_empty("hiragana", path)? {
    let csv_path = Path::new("./data/hiragana.csv");
    let csv_data = load_csv(csv_path)?;
    seed_database_with_hiragana(csv_data, path)?;
    println!("Successfully seeded database with hiragana.");
  }

  // Check and seed "katakana"
  if is_table_empty("katakana", path)? {
    let csv_path = Path::new("./data/katakana.csv");
    let csv_data = load_csv(csv_path)?;
    seed_database_with_katakana(csv_data, path)?;
    println!("Successfully seeded database with katakana.");
  }

  Ok(())
}

#[tauri::command]
fn create_new_database(new_path: String) -> Result<(), String> {
  
  initialize_new_database(&new_path).map_err(|e| e.to_string())?;

  Ok(())
}

#[derive(Serialize)] 
struct HiraganaEntry {
    id: i32,
    hiragana: String,
    english: String,
}

#[tauri::command]
fn get_hiragana_entries(path: &str) -> Result<Vec<HiraganaEntry>, String> {
  let conn = connect_to_database(path).map_err(|e| e.to_string())?;

  let mut stmt = conn.prepare("SELECT id, hiragana, english FROM hiragana").map_err(|e| e.to_string())?;

  let rows = stmt.query_map([], |row| {
    Ok(HiraganaEntry {
        id: row.get(0)?,
        hiragana: row.get(1)?,
        english: row.get(2)?,
    })
  }).map_err(|e| e.to_string())?;

  let entries: Vec<HiraganaEntry> = rows.filter_map(|r| r.ok()).collect();
  Ok(entries)
}

#[derive(Serialize)] 
struct KatakanaEntry {
    id: i32,
    katakana: String,
    english: String,
}

#[tauri::command]
fn get_katakana_entries(path: &str) -> Result<Vec<KatakanaEntry>, String> {
  let conn = connect_to_database(path).map_err(|e| e.to_string())?;

  let mut stmt = conn.prepare("SELECT id, katakana, english FROM katakana").map_err(|e| e.to_string())?;

  let rows = stmt.query_map([], |row| {
    Ok(KatakanaEntry {
        id: row.get(0)?,
        katakana: row.get(1)?,
        english: row.get(2)?,
    })
  }).map_err(|e| e.to_string())?;

  let entries: Vec<KatakanaEntry> = rows.filter_map(|r| r.ok()).collect();
  Ok(entries)
}

#[derive(Serialize, Deserialize)] 
struct Phrase {
    id: i32,
    japanese_phrase: String,
    romaji: String,
    english_translation: String,
    breakdown: String,
}

#[tauri::command]
fn get_phrase_entries(path: &str) -> Result<Vec<Phrase>, String> {
  let conn = connect_to_database(path).map_err(|e| e.to_string())?;

  let mut stmt = conn.prepare("SELECT id, japanese_phrase, romaji, english_translation, breakdown FROM phrase")
    .map_err(|e| e.to_string())?;

  let rows = stmt.query_map([], |row| {
    Ok(Phrase {
        id: row.get(0)?,
        japanese_phrase: row.get(1)?,
        romaji: row.get(2)?,
        english_translation: row.get(3)?,
        breakdown: row.get(4)?,
    })
  }).map_err(|e| e.to_string())?;

  let entries: Vec<Phrase> = rows.filter_map(|r| r.ok()).collect();
  Ok(entries)
}

#[tauri::command]
fn insert_phrase(phrase_data: Phrase, path: &str) -> Result<Phrase, String>{
  let conn = connect_to_database(path).map_err(|e| e.to_string())?;

  conn.execute(
    "INSERT INTO phrase (japanese_phrase, romaji, english_translation, breakdown) VALUES (?1, ?2, ?3, ?4)",
    params![phrase_data.japanese_phrase, phrase_data.romaji, phrase_data.english_translation, phrase_data.breakdown],
  ).map_err(|e| e.to_string())?;

  let id: i64 = conn.last_insert_rowid();

  let mut stmt = conn.prepare("SELECT id, japanese_phrase, romaji, english_translation, breakdown FROM phrase WHERE id = ?1").map_err(|e| e.to_string())?;

  let phrase = stmt.query_row(params![id], |row| {
    Ok(Phrase {
        id: row.get(0)?,
        japanese_phrase: row.get(1)?,
        romaji: row.get(2)?,
        english_translation: row.get(3)?,
        breakdown: row.get(4)?
    })
  }).map_err(|e| e.to_string())?;

  Ok(phrase)
}

fn main() -> Result<()> {
  
  // Interface with the frontend
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      create_new_database,
      get_hiragana_entries, get_katakana_entries, 
      get_phrase_entries, insert_phrase])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

  Ok(())
}
