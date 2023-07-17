@feature-create-board
Feature: Board Creation
  As a user
  I want to be able to create a new board
  So that I can organize my tasks and projects

  Background:
    Given the user is on the homepage

  @valid
  Scenario: User creates a new board with valid information
    When the user clicks on the "Create Board" button
    And the user enters a board name "<boardName>"
    And the user selects a background color or image "<background>"
    And the user submits the form
    Then a new board named "<boardName>" with background "<background>" is created
    And the user is navigated to the newly created board

    Examples:
      | boardName | background    |
      | Board 1   | Color: #FF0000|
      | Board 2   | Image: bg.jpg |

  @valid
  Scenario: User creates a new board without selecting a background
    When the user clicks on the "Create Board" button
    And the user enters a board name "<boardName>"
    And the user does not select a background
    And the user submits the form
    Then a new board named "<boardName>" is created
    And the user is navigated to the newly created board

    Examples:
      | boardName |
      | Board 3   |
      | Board 4   |

  @invalid
  Scenario: User tries to create a new board with a duplicate name
    Given a board named "Existing Board" already exists
    When the user clicks on the "Create Board" button
    And the user enters the board name "Existing Board"
    And the user selects a background color or image
    And the user submits the form
    Then an error message is displayed stating that the board name already exists

  @invalid
  Scenario: User cancels the creation of a new board
    When the user clicks on the "Create Board" button
    And the user enters a board name
    And the user selects a background color or image
    And the user cancels the form submission
    Then the form or modal is closed
    And no board is created

  @invalid
  Scenario: User encounters an error while creating a new board
    When the user clicks on the "Create Board" button
    And the user enters a board name
    And the user selects a background color or image
    And there is a server error during the form submission
    Then an error message is displayed stating that there was an issue creating the board
