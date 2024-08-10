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

## CONTEXTS

Some terms may be used in a specific context. This app uses `filename`, `formal`, and `presentation` contexts.

>**dogQuestion** = Normal use
>
>>`"dogQuestion": "Is this a dog?"`
>
>**dog_filename** = Must consist of only characters safe to use in a filename (this is generally anything except `\/:*?"<>|`).
>
>>`"dogQuestion_filename": "Is this a dog"`
>
>**dog_formal** = This is being used as a proper name or otherwise has importance. In English, this simply means Capitalizing Most Words.
>
>>`"dogQuestion_formal": "Is This a Dog?"`
>
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

## Labels

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
>**🟦x🟦** :: Toast messages that stays on screen for `x` seconds *('Toasts' are popups that disappear on their own)*
>
>> *For example,* `🟦3.5🟦` *indicates a toast message that displays for three and a half seconds before disappearing.*
>>
>> Users should be able to read toast messages before `x` seconds have expired.
>
>🔵 :: ARIA labels *(accessibility messages, not visible to the average user)*

Keys without any of these notes are only shown on-screen in plain text.

## Common Terms : common.tsx

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
| | Display | Display: | *(presentational context)* A choice of something to display |
| | SavedAt | Saved: {{time}} | Indicates when something was saved. {{time}} is replaced with a timestamp. |
