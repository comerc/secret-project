@feature-lists
Feature: View List
  As a user
  In order to see the cards in a list
  I want to be able to view a specific list in a board

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: View a list in a board
    Given a user wants to view a specific list with the ID <listId> in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    And the list with the ID <listId> exists in the board
    When they request to view the list
    Then the list's ID should be <listId>
    And the list's name should be <listName>
    And the list's cards should be displayed

    Examples:
      | boardId | listId | listName |
      | board-1 | list-1 | List 1   |
      | board-2 | list-2 | List 2   |

  @invalid @regression-test
  Scenario: View a non-existent list
    Given a user wants to view a specific list with the ID <listId> in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    And the list with the ID <listId> does not exist in the board
    When they request to view the list
    Then an error message should be displayed indicating that the list does not exist

    Examples:
      | boardId | listId |
      | board-1 | list-3 |
      | board-2 | list-4 |

  @valid @regression-test
  Scenario: View an empty list
    Given a user wants to view a specific list with the ID <listId> in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    And the list with the ID <listId> exists in the board
    And the list with the ID <listId> is empty
    When they request to view the list
    Then the list's ID should be <listId>
    And the list's name should be <listName>
    And the list's cards should be empty

    Examples:
      | boardId | listId | listName |
      | board-1 | list-5 | List 5   |
      | board-2 | list-6 | List 6   |
