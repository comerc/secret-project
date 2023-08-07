@feature-lists
Feature: Close List
  As a user
  In order to manage the status of a list
  I want to be able to close a specific list in a board

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario Outline: Close a list
    Given a user wants to close a specific list
    And the board with the ID <boardId> exists
    And the list with the ID <listId> exists in the board
    When they close the list
    Then the list's ID should be <listId>
    And the list should be closed

    Examples:
      | boardId  | listId  |
      | board-1  | list-1  |
      | board-2  | list-2  |

  @valid @regression-test
  Scenario Outline: Close a list that is already closed
    Given a user wants to close a specific list
    And the board with the ID <boardId> exists
    And the list with the ID <listId> exists in the board
    And the list is already closed
    When they attempt to close the list again
    Then the list's ID should be <listId>
    And the list should remain closed

    Examples:
      | boardId  | listId  |
      | board-1  | list-1  |
      | board-2  | list-2  |

  @invalid @regression-test
  Scenario Outline: Close a list that does not exist
    Given a user wants to close a specific list
    And the board with the ID <boardId> exists
    And the list with the ID <listId> does not exist in the board
    When they attempt to close the list
    Then an error should be returned stating that the list does not exist

    Examples:
      | boardId  | listId  |
      | board-1  | list-1  |
      | board-2  | list-2  |
