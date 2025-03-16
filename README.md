# Text Tools

![Text Tools Logo](/placeholder.svg)

A cutesy text manipulation application built with Next.js and React. This
application provides a variety of text tools wrapped in an adorable interface.

## Table of Contents

- [Text Tools](#text-tools)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Main Text Area](#main-text-area)
    - [Structural Tools](#structural-tools)
    - [Case and Style Tools](#case-and-style-tools)
    - [Cleaning Tools](#cleaning-tools)
    - [Formatting Tools](#formatting-tools)
    - [Transformation Tools](#transformation-tools)
    - [Language Tools](#language-tools)
    - [Analysis Tools](#analysis-tools)
  - [Project Structure](#project-structure)
  - [Customisation](#customisation)
  - [Contributing](#contributing)
  - [Documentation To Reference](#documentation-to-reference)

## Features

1. **Main Text Area**: A central area for text input with copy, undo and redo
   functionality.
2. **Structural Tools**:
   - Text Wrapper: Wrap text based on character count with word-based or strict
     options.
   - Indentation Adjuster: Add or remove leading spaces.
   - Bullet/Numbered List Formatter: Convert plain text into ordered or
     unordered lists.
3. **Case and Style Tools**:
   - Case Converter: Convert text between lowercase, uppercase, title case and
     sentence case.
   - Text Normaliser: Remove extra spaces and trim whitespace.
   - CamelCase/Underscore Converter: Convert text to camelCase, snake_case or
     kebab-case.
4. **Cleaning Tools**:
   - Emoji/Unicode Remover: Strip emojis or non-ASCII characters from text.
   - Punctuation Remover: Remove punctuation marks.
   - Stop word Remover: Filter out common stop words.
   - HTML/XML Tag Stripper: Clean text by removing HTML or XML tags.
   - Profanity Filter: Censor offensive words.
5. **Formatting Tools**:
   - Text Justifier: Align text to the left, right or center.
   - Whitespace Adjuster: Replace tabs with spaces or collapse multiple spaces.
   - Markdown Formatter: Convert plain text into Markdown format.
6. **Transformation Tools**:
   - Text Reverser: Reverse characters in text.
   - Base64 Encoder/Decoder: Convert text to and from Base64 format.
   - Find and Replace: Locate and replace specific patterns in text.
7. **Language Tools**:
   - Transliteration Tool: Convert text between different scripts (e.g. Cyrillic
     to Latin).
   - Text Tokeniser: Break text into smaller units.
   - Language Detector: Identify the language of the given text.
8. **Analysis Tools**:
   - Character Counter: Count the number of characters in the text.
   - Word Counter: Count the number of words in the text.
   - Line Counter: Count the number of lines in the text.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```zsh
   git clone [https://github.com/jediahjireh/text-tools.git](https://github.com/jediahjireh/text-tools.git)
   ```

2. Navigate to the project directory:

   ```zsh
   cd text-tools
   ```

3. Install dependencies:

   ```zsh
   npm install
   ```

4. Run the development server:

   ```zsh
   npm run dev
   ```

5. Open the [default localhost](http://localhost:3000) in your browser to see
   the application.

## Usage

### Main Text Area

- Enter or paste your text in the main text area.
- Use the "Copy" button to copy the entire text to your clipboard.
- Use the "Undo" and "Redo" buttons to navigate through your text history.

### Structural Tools

- **Text Wrapper**: Enter the desired line length (character count) and select
  the wrapping mode (word-based or strict).
- **Paragraph Wrapper**: Enter the desired line count and click "Wrap".
- **Indentation Adjuster**: Specify the number of spaces for indentation and
  click "Adjust".
- **List Formatter**: Choose between bullet or numbered list and click "Format".

### Case and Style Tools

- **Case Converter**: Select the desired case type and click "Convert Case".
- **Style Converter**: Choose the style (camelCase, snake_case, kebab-case) and
  click "Convert Style".
- **Text Normaliser**: Click "Normalise Text" to remove extra spaces and trim
  whitespace.

### Cleaning Tools

- Use the respective buttons to remove emojis, punctuation, stop words, HTML
  tags or filter profanity.

### Formatting Tools

- **Text Justifier**: Choose the alignment (left, right, center) and click
  "Justify Text".
- **Whitespace Adjuster**: Click "Adjust Whitespace" to normalise spaces and
  tabs.
- **Markdown Converter**: Click "Convert to Markdown" to format text as
  Markdown.

### Transformation Tools

- **Text Reverser**: Click "Reverse Text" to reverse the characters in the text.
- **Base64 Encoder/Decoder**: Use "Encode Base64" or "Decode Base64" as needed.
- **Find and Replace**: Enter the text to find and its replacement, then click
  "Find and Replace".

### Language Tools

- **Transliterator**: Click "Transliterate" to convert between scripts
  (currently Cyrillic to Latin).
- **Text Tokeniser**: Click "Tokenise Text" to break the text into individual
  words.
- **Language Detector**: Click "Detect Language" to identify the probable
  language of the text.

### Analysis Tools

- View the character count, word count and line count of your text.

## Project Structure

```txt
text-tools/
├── app/
│ ├── components/
│ │ ├── AnalysisTools.tsx
│ │ ├── CaseAndStyleTools.tsx
│ │ ├── CleaningTools.tsx
│ │ ├── Decorations.tsx
│ │ ├── FormattingTools.tsx
│ │ ├── LanguageTools.tsx
│ │ ├── StructuralTools.tsx
│ │ ├── TextArea.tsx
│ │ └── TransformationTools.tsx
│ ├── layout.tsx
│ └── page.tsx
├── public/
│ ├── placeholder.svg
├── styles/
│ └── globals.css
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tailwind.config.js
```

## Customisation

To customise the appearance:

1. Modify the CSS classes in the component files. The project uses Tailwind CSS
   for styling.
2. To change the color scheme, update the `tailwind.config.js` file and modify
   the color classes in the components.
3. To add new features, create new components in the `app/components` directory
   and import them in `app/page.tsx`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new-feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate
tests.

## Documentation To Reference

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React Icons](https://lucide.dev/)

---
