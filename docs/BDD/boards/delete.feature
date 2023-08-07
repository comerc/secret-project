@feature-boards
Feature: Close Board
  As a user
  I want to be able to close a board
  So that I can mark it as completed and no longer work on it

  Background:
    Given I am a registered user
    And I am logged in
    And I have a board with the name "Test Board"

  @valid @smoke-test
  Scenario: Close a board successfully
    When I close the board "Test Board"
    Then the board is closed
    And the board's status is updated to "closed"
    And the board's dateClosed is set to the current date

  @invalid @regression-test
  Scenario: Close a board that does not exist
    When I attempt to close a board with the name "Nonexistent Board"
    Then an error message is displayed

  @valid @regression-test
  Scenario: Reopen a closed board
    Given I have a closed board with the name "Closed Board"
    When I reopen the board "Closed Board"
    Then the board is reopened
    And the board's status is updated to "open"
    And the board's dateClosed is set to null

  @valid @regression-test
  Scenario: Close a board with existing cards
    Given the board "Test Board" has existing cards
    When I close the board "Test Board"
    Then the board is closed
    And the board's status is updated to "closed"
    And the board's dateClosed is set to the current date
    And all cards in the board are closed

  @valid @regression-test
  Scenario: Close a board with no existing cards
    Given the board "Test Board" has no existing cards
    When I close the board "Test Board"
    Then the board is closed
    And the board's status is updated to "closed"
    And the board's dateClosed is set to the current date

  @invalid @regression-test
  Scenario: Close a board that is already closed
    Given the board "Test Board" is already closed
    When I attempt to close the board "Test Board"
    Then an error message is displayed

  @valid @regression-test
  Scenario: Close multiple boards
    Given I have multiple open boards
    When I close all open boards
    Then all boards are closed
    And the status of all boards is updated to "closed"
    And the dateClosed of all boards is set to the current date

  Examples:
    |                    |
    | Test Board         |
    | Nonexistent Board  |
    | Closed Board       |

  @valid @regression-test
  Scenario: Close a board with open tasks
    Given the board "Test Board" has open tasks
    When I close the board "Test Board"
    Then the board is closed
    And the board's status is updated to "closed"
    And the board's dateClosed is set to the current date
    And all open tasks in the board are closed

  @valid @regression-test
  Scenario: Close a board with no open tasks
    Given the board "Test Board" has no open tasks
    When I close the board "Test Board"
    Then the board is closed
    And the board's status is updated to "closed"
    And the board's dateClosed is set to the current date

  @invalid @regression-test
  Scenario: Close a board with invalid name
    When I attempt to close a board with an invalid name <invalidName>
    Then an error message is displayed

  Examples:
    | invalidName  |
    | 1234         |
    | Test$Board   |
