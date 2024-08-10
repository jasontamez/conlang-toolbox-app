# Translation Guide

## PLURALITY

Some terms will end in \_one or \_other. They always have a `count` property that can be used if needed.

>**dog_one** = 1 dog
>
>>`"There is {{count}} dog."`  
>>= "There is 1 dog."
>
>**dog_other** = 0 dogs, 2+ dogs, etc
>
>>`"There are {{count}} dogs."`  
>>= "There are 17 dogs."

Other languages may have their own plurality \_endings. Check your i18n specifications.

---

## CONTEXTS

Some terms may be used in a specific context. This app uses `filename`, `formal`, and `presentation` contexts.

### Normal

>**dogQuestion** = Normal use
>
>>`"dogQuestion": "Is this a dog?"`

### Filename

>**dog_filename** = Must consist of only characters safe to use in a filename (this is generally anything except `\/:*?"<>|`).
>
>>`"dogQuestion_filename": "Is this a dog"`

### Formal

>**dog_formal** = This is being used as a proper name or otherwise has importance. In English, this simply means Capitalizing Most Words.
>
>>`"dogQuestion_formal": "Is This a Dog?"`

### Presentation

>**dog_presentation** = This is a user-facing term that is "pointing" at...
>
>- important information
>- a text box
>- a selectable option
>- a toggleable option
>- or something similar
>
>In English, I add a colon on the end of the formal term.
>
>>`"dogQuestion_presentation": "Is This a Dog?:"`

---

## Labels

These symbols indicate *where* in the app a message is used.

>🟥 :: Headers *(important text in the app, possibly placed in the toolbar)*
>
>> Text headers should be relatively short and are usually capitalized.
>
>🔴 :: Button or option text
>
>> Button text should be kept short
>
>🟨 :: Dialog box headers *(yes/no prompts, alerts, etc, are dialog boxes)*
>
>🟡 :: Dialog box messages
>
>> Dialog box text should be clear and concise. Dialog box headers should be kept reasonably short.
>
>**🟦x** :: Toast messages that stays on screen for `x` seconds *('Toasts' are popups that disappear on their own)*
>
>> *For example,* `🟦3.5` *indicates a toast message that displays for three and a half seconds before disappearing.*
>>
>> Users should be able to read toast messages before `x` seconds have expired.
>
>🔵 :: ARIA labels *(accessibility messages, not visible to the average user)*

Keys without any of these notes are only shown on-screen in plain text.

---

## Common Terms : common.tsx

These are terms used across the app, or only on "main" app pages, like Settings and About.

| Label | Key | English Translation | Description (if needed) |
| --- | --- | --- | --- |
| 🟥 | appTitle | Conlang Toolbox | Title of the app. |
| 🟥 | appSubtitle | tools for language invention | Subtitle of the app. |
| 🟥 | MorphoSyntax | MorphoSyntax | Title of the MorphoSyntax tool. It is based on the word "morphosyntax", the study of the form and meaning of language through the structure of words and sentences. |
| 🟥 | WordGen | WordGen | Title of the WordGen tool. It is a combination of "word" and "generator". |
| 🟥 | WordEvolve | WordEvolve | Title of the WordEvolve tool. It is a combination of "word" and "evolve". |
| 🟥 | Declenjugator | Declenjugator | Title of the Declenjugator tool. It is a combination of "declension" (modifying nouns based on their case) and "conjugation" (modifying verbs based on their tense, aspect and/or mode), along with an -or suffix to indicate it's an object that does something. |
| 🟥 | Lexicon | Lexicon | Title of the Lexicon tool. |
| 🟥 | Concepts | Concepts | Title of the Concepts tool. |
| 🟥 | AppInfo | App Info | Title of the page where you find information about the app. |
| 🟥 | AppSettings | App Settings | Title of the page where you find settings for the entire app. |
| 🟥 | Main | Main | Title of the "About" page, which is also the app startup page. |
| 🟥 | Overview | Overview | Title of several pages which provide a broad overview of a tool. |
| 🟥 | Settings | Settings | Title of several pages where you can find settings for the various tools. |
| 🟥 | Input | Input | Title of several pages where you "input" things into a tool. |
| 🟥 | Output | Output | Title of several pages where a tool presents output. |
| 🟥 | Info | Info | Title of several modals that provide information. |
| 🔴 | Cancel | Cancel | Cancel current operation |
| 🔴 | Clear | Clear | Clear all input or output |
| 🔴 | Save | Save | Save the current information |
| 🔴 | Ok | Ok | General acknowledgement |
| 🔴 | Done | Done | User has finished using this modal or tool |
| 🔴 | Close | Close | Close the modal |
| 🔴 | Help | Help | Get helpful information |
| 🔴 | AddAndClose | Add and Close | Text of button that adds something and closes a modal |
| 🔴 | AddNew | Add New | Text of button that adds a new thing |
| 🔴 | Copy | Copy | Copy information |
| 🔴 | Generate | Generate | Generate some output |
| 🔴 | CopyToClipboard | Copy to Clipboard | Copy something to the clipboard |
| 🔵 | CharactersToBeCopied | Characters to be copied | ARIA label for the input box inside Extra Characters that holds characters to be copied. |
| | Display | Display: | *(presentation context)* A choice of something to display |
| | SavedAt | Saved: {{time}} | Indicates when something was saved. `{{time}}` is replaced with a timestamp. |
| 🟦1.5 | CopiedToClipboard | Copied to clipboard | Displays after anything has been copied to the clipboard. |
| 🟦1.5 | NothingToCopy | Nothing to copy | Displays when the user tries to copy something to the clipboard, but there is nothing to copy. |
| | Untitled | \[Untitled] | This is used as a document title if no title is given. |
| | fileFormat | {{title}} - {{date}}.{{extension}} | This becomes a filename and is used by MorphoSyntax, Declenjugator, and Lexicon for exporting documents. `{{title}}` is user-generated, `{{date}}` is replaced with a datestamp in a format like "Thu Jan 01 1970", and `{{extension}}` will be a common file extension like "docx" or "csv". |
| 🟦10 | UnableToExport | UNABLE TO EXPORT: {{error}} | Displayed when the app is unable to export a document to the user's device. `{{error}}` is a system-generated error message. |
| 🟦5 | FileExported | {{filename}} exported. | Displayed when a file is successfully exported to the user's device. |
| | andGlue | ", " | Put between items when the app assembles items into a single sentence. **Note:** The quotation marks are not a part of the message, they are there to indicate it ends with a space. |
| | andFinal | ", and " | Put between the penultimate and ultimate items instead of `andGlue`. **Note:** The quotation marks are not a part of the message, they are there to indicate it ends with a space. |
| | joinTwo | {{one}} and {{two}} | Used instead of `andGlue` when there are only two items in a list. |
| 🟨 | ExitAppQHead | Exit App? | Header of a yes/no confirmation dialog when the user hits the device back button and is about to close the app. |
| 🟡 | ExitAppQ | Do you want to exit the app? | Body text of the confirmation dialog above |
| 🔴 | YesExit | Yes, Exit! | The "yes" button on the confirmation dialog above |
| 🟦3.5 | saveToLexColumn_one | {{count}} word saved to $t(Lexicon) under "{{column}}" | Used when words from other tools are added to Lexicon. `{{column}}` is the name of the column the words were saved under. `$t(Lexicon)` is replaced with the `Lexicon` translation above. |
| 🟦3.5 | saveToLexColumn_other | {{count}} words saved to $t(Lexicon) under "{{column}}" | Same as above, but for English plurality rules. |
| 🟨 | SelectAColumn | Select a column | Used in dialogs where the user is attempting to take words from a tool and save them in Lexicon. |
| 🟡 | SaveToLexiconMessage | Your selected words will be added to the $t(Lexicon) under that column. | Used in dialogs where the user is about to send words to the Lexicon to be saved. |
| 🟦3.5 🔴 | GoToLexicon | Go to $t(Lexicon) | Used in a button inside a toast message after the user has successfully saved words from a tool into Lexicon. |
| 🟦2.5 | TapWordsToSave | Tap words you want to save to $t(Lexicon). | Used inside of tools when prompting the user to tap on words on the screen that they wish to save to Lexicon. |
| 🟨 🟥 | ChooseFormat | Choose a Format | Used when the user is about to export a file and they have to choose what file format they will use. |
| 🟨 🟥 | ChooseFormat_presentation | Choose a format: | The *presentation* context of the above. |
| 🔴 | fileDocx | Word Document (docx) | User-selectable option for file export |
| 🔴 | fileText | Text File | User-selectable option for file export |
| 🔴 | filePlain | $t(fileText) (plain) | User-selectable option for file export |
| 🔴 | fileMd | $t(fileText) (markdown) | User-selectable option for file export |
| 🔴 | fileCsv | Spreadsheet (csv) | User-selectable option for file export |
| 🔴 | fileJson | JSON File | User-selectable option for file export |
| 🔴 | fileXml | XML File | User-selectable option for file export |
| 🟦2.5 | thingsDeleted_one | {{things}} deleted | Tells the user that something has been deleted. `{{things}}` will be replaced by a singular thing. This also takes a `{{count}}` property for plurlity. |
| 🟦2.5 | thingsDeleted_other | {{things}} deleted | Same as above, but for English plurality rules. |
| 🟡 | clearOverwriteGeneralThings | This will clear and overwrite {{things}}. | General Things are unknown: may be 0, 1, or any number. `{{things}}` will be provided by the app. |
| 🟥 🔴 | saveGeneralThings | Save {{things}} | General Things are unknown: may be 0, 1, or any number. `{{things}}` will be provided by the app. |
| 🟦2 | thingAdded | {{thing}} added. | General message |
| 🟦2 | thingSaved | {{thing}} saved. | General message |
| 🟦2.5 | thingDeleted | {{thing}} deleted. | General message |
| 🟦2 🟨 | thingEdited | {{thing}} edited. | General message |
| 🔴 🟨 | deleteThing | Delete {{thing}} | General message |
| 🟥 | editThing | Edit {{thing}} | General message |
| 🟥 🔴 | addThing | Add {{thing}} | General message |
| 🔴 | saveThing | Save {{thing}} | General message |
| 🟥 | loadThing | Load {{thing}} | General message |
| 🟨 | missingThing | Missing {{thing}} | General message |
| 🟥 | exportThing | Export {{thing}} | General message |
|  | exportThing_presentation | Export {{thing}}: | *Presentation* context of the above. |
| 🟨 | deleteTitleQ | Delete "{{title}}"? | Message used with user-titled info. |
| 🟨 | loadTitleQ | Load "{{title}}"? | Message used with user-titled info. |
| 🟦2.5 | titleSaved | "{{title}}" saved. | Message used with user-titled info. |
| 🟨 | titleAlreadyExists | "{{title}}" already exists. | Message used with user-titled info. |
| 🟦2.5 | titleLoaded | "{{title}}" loaded. | Message used with user-titled info. |
| 🟡 | titleNotFound | "{{title}}" not found. | Message used with user-titled info. |
| 🟦2.5 | titleDeleted | "{{title}}" deleted. | Message used with user-titled info. |
| 🟦2.5 | titleOverwritten | "{{title}}" overwritten. | Message used with user-titled info. |
| 🔴 | YesOverwriteIt | Yes, Overwrite It | Confirmation button when the user is about to overwrite stored info in WordGen, WordEvolve, or Declenjugator |
|  | prevSave | the previous save | Used as a "general thing" in some of the messages above. |
|  | CurrentInfo | Current Info | Used as a "general thing" in some of the messages above. |
| 🟨 | LoadError | Load Error | Shows up in dialogs explaining that the app was unable to load stored info. |
| 🟥 | ManageCustomInfo | Manage Custom Info | Header for modals where the user is manipulating stored info inside a tool. |
|  | NameYourInfo | Name your custom info | Provided as a hint when the user is prompted to entitle a save. |
| 🔵 | NameOfSave | Name of save | As above, but is the ARIA text for the input. |
| 🔴 | Load | Load | When loading stored information. |
|  | NoSavedInfo | No saved info | A message that shows up in some dialog boxes if the user hasn't saved anything in that tool yet. |
|  | SortMethod | Sort method: | *(presentation context)* Indicates a way to sort the given info. |
| 🟡 | cannotUndo | This cannot be undone. | This action, usually deleting something, cannot be undone. |
| 🟡 | areYouSure | Are you sure? | Do you want to do this action? |
| 🟡 | deleteThisCannotUndo | Are you sure you want to delete this? $t(cannotUndo) | Combines the `cannotDo` message with the common use case where something is about to be deleted. |
