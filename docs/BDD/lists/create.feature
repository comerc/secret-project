@feature-lists
Feature: Create New List
  As a user
  In order to organize my boards
  I want to be able to create a new list in a board

  Background:
    Given I am a registered user
    And I am logged in

  @valid @smoke-test
  Scenario: Create a new list in a board
    Given a user wants to create a new list in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    When they provide a name for the new list as <listName>
    Then a new list should be created in the board with the name <listName>
    And the new list should have a unique ID

  @invalid @regression-test
  Scenario: Create a new list in a non-existent board
    Given a user wants to create a new list in a board with the ID <boardId>
    And the board with the ID <boardId> does not exist
    When they provide a name for the new list as <listName>
    Then an error message should be displayed indicating the board does not exist

  # @valid @smoke-test
  # Scenario: Create a new list with a long name
  #   Given a user wants to create a new list in a board with the ID <boardId>
  #   And the board with the ID <boardId> exists
  #   When they provide a long name for the new list as <longListName>
  #   Then a new list should be created in the board with the long name <longListName>
  #   And the new list should have a unique ID

  # @invalid @regression-test
  # Scenario: Create a new list without providing a name
  #   Given a user wants to create a new list in a board with the ID <boardId>
  #   And the board with the ID <boardId> exists
  #   When they do not provide a name for the new list
  #   Then an error message should be displayed indicating that a name is required

  # @valid @smoke-test
  # Scenario: Create a new list with special characters in the name
  #   Given a user wants to create a new list in a board with the ID <boardId>
  #   And the board with the ID <boardId> exists
  #   When they provide a name with special characters for the new list as <specialListName>
  #   Then a new list should be created in the board with the name <specialListName>
  #   And the new list should have a unique ID

  @invalid @regression-test
  Scenario: Create a new list with an empty name
    Given a user wants to create a new list in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    When they provide an empty name for the new list
    Then an error message should be displayed indicating that the name cannot be empty

  @valid @smoke-test
  Scenario: Create multiple new lists in a board
    Given a user wants to create multiple new lists in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    When they provide names for the new lists as <listName1>, <listName2>, <listName3>
    Then new lists should be created in the board with the names <listName1>, <listName2>, <listName3>
    And each new list should have a unique ID

  @valid @smoke-test
  Scenario: Create a new list in a board that already has lists
    Given a user wants to create a new list in a board with the ID <boardId>
    And the board with the ID <boardId> exists
    And the board already has existing lists
    When they provide a name for the new list as <listName>
    Then a new list should be created in the board with the name <listName>
    And the new list should have a unique ID
