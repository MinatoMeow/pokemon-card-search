# Pokemon Card Search

Thank you for looking at my project using the [TCGdex API.](https://tcgdex.dev/)

## How to Search
Searching is currently limited to the English Versions of the first 5 Base Sets and the Black Star Promos.

You can search through all Base Set cards by choosing "**All Base Sets**" in the dropdown.
You can search for random Base Set cards by leaving the search blank.
If multiple related cards are found, they will also be shown under the search bar.

## How to build locally

Download the repo and install the necessary modules using `npm i`.
You can change the `port` to any desired open port or use the default set.

Run `nodemon index.js` and the page should now be viewable on the selected port.

Instructions for filtering for cards is displayed [here on the TCGdex page.](https://tcgdex.dev/rest/filtering-sorting-pagination)
This project is set to display Base Set Release cards only, as a learning experience, but can easily be changed or expanded. 
