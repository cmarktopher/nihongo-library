## Background

This is a passion project that I decided to start to help me learn Japanese and to also showcase my skills in Angular and Tauri. My aim is to have this application run completely local and offline, with eventual online and AI functionality integrated into the application.

## Features

Here are some of the features that have been implemented so far. Please bare in mind that this application is still in development and current features will improve over time.

### Phrase Library

Phrase library where you can add Japanese phrases with their respective romanji, translation and a breakdown of the phrase.

Personally, I have been using ChatGpt for this. In the prompt, I will provide the Japanese sentence/phrase and have it provide a translation, the romanji and a detailed breakdown. This is being done manually at the moment and I intend to utilize a local LLM to automate this process.

![Screenshot of the phrase library.](/src/assets/nihongo-library/phrases.png)
![Screenshot of a phrase in view mode.](/src/assets/nihongo-library/phrase-view.png)
![Screenshot of a phrase in edit mode.](/src/assets/nihongo-library/phrase-edit.png)

### Character Lists

A display of hiragana and katakana characters with search capabilities for easy lookup of said characters. Kanji is still a work in progress as I have yet to decide the best way to display this (and also, there is a lot of kanji).

![Screenshot of all hiragana being shown.](/src/assets/nihongo-library/hiragana-full-list.png)
![Screenshot of katakana being filtered for 'o'.](/src/assets/nihongo-library/katakana-filter-o.png)

## Planned Features

Here are some planned features.

### Memory Card System

This is a high priority feature.

The idea is to use the collection of phrases in the phrase library to build out memory cards. Spaced repetition will then be used to determine which cards appear again.

Once local (and perhaps online via APIs) LLM integration is implemented, I will have it assist in deciding which cards to display again and at what interval.

### LLM translations and assistance

I intend to integrate local LLMs (and online at a later point) into this application to provide phrase/sentence translations and breakdowns which will autofill the phrase form. As mentioned, LLMs will also be used for assistance in the memory card system.