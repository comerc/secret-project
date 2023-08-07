@feature-lists
Feature: Edit List
  As a user
  In order to update the details of a list
  I want to be able to edit a specific list in a board

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: Edit list name
    Given a user wants to edit the name of a specific list with the ID <listId> in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    And the list with the ID <listId> exists in the board
    When they update the list name to <newListName>
    Then the list's ID should be <listId>
    And the list's name should be <newListName>

    Examples:
      | boardId | listId | newListName    |
      | board-1 | list-1 | Updated List 1 |
      | board-2 | list-2 | Updated List 2 |

  @invalid @regression-test
  Scenario: Edit non-existent list
    Given a user wants to edit a specific list with the ID <listId> in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    And the list with the ID <listId> does not exist in the board
    When they attempt to edit the list
    Then an error message should be displayed indicating that the list does not exist

    Examples:
      | boardId | listId |
      | board-1 | list-3 |
      | board-2 | list-4 |

  @invalid @regression-test
  Scenario Outline: Edit list with empty name
    Given a user wants to edit the name of a specific list with the ID "<listId>" in a board with the ID "<boardId>"
    And the board with the ID "<boardId>" exists
    And the list with the ID "<listId>" exists in the board
    When they update the list name to an empty value
    Then an error should be returned stating that the list name cannot be empty

    Examples:
      | boardId | listId | newListName |
      | board-1 | list-1 |             |
      | board-2 | list-2 |             |
