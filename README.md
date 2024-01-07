# Jeu de mémoire

This project was a team effort and developed during my software development program.

## Project Details

1. During the project design, each team member should make a minimum of 5 modifications and push them to the central repository. Write a meaningful comment for each pushed modification.

2. In Visual Studio, create a new project named "TP2" of type ASP.Net (.NET framework) empty. Push this initial version to DevOps – Git, in the master branch. Ensure that all developers can operate. Initially, modifications will be made directly in this branch.

3. Retrieve the files provided with this statement and place them in your project.

4. Add a web page named `index.html` and include META tags.

5. Layout considerations for the page:
   - Use the DIV tag to create game sections.
   - For the "Start" and "Solve" buttons, use the INPUT or BUTTON tag and modify appearances using styles (LESS and CSS).

6. Use JavaScript/jQuery for game management. For the grid management, create an array in memory to shuffle the cards. Two possible options:
   - 1D Array:
     ```
     2 4 1 5 5 3 6 2
     7 8 8 6 1 7 4 3
     ```
   - 2D Array:
     ```
     2 4 1 5
     5 3 6 2
     7 8 8 6
     1 7 4 3
     ```
   Numbers in the arrays correspond to images. Examples: 0 → "carte_dos3.png", 1 → "boussole.png", etc.

7. Buttons:
   - **Start/Restart Button:** When clicked, the timer stops, and the board is hidden to prevent the player from trying to find objects when the timer is stopped. Another click resumes the game.
   - **Solve Button:** When the player clicks this button, all cards are turned to show the solution. The timer is stopped.

8. Timer:
   - When the player clicks Start/Restart, the timer starts at 0 and increases every second. It stops when the grid is completed.

10. Statistics:
   - **Moves:** Corresponds to 2 clicks (on two unturned cards), whether they are the same or not.
   - **Best Moves:** Keep track of the lowest number of moves made to complete the grid.
   - **Errors:** Corresponds to 2 clicks on two unturned and different cards only.
   - **Best Time:** When all 16 cards are found, keep the best time.
