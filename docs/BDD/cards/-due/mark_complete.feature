@feature-cards-due
Feature: Mark Card as Complete
  As a user
  I want to mark a card as complete
  So that I can keep track of completed tasks

  Background:
    Given I am a registered user
    And I am logged in
    And I have existing cards with the following attributes:
      | closed | desc  | due  | dueComplete | dueReminder | id  | idList | name | start | subscribed |
      | true   | Desc1 | null | false       | null        | id1 | list1  | Card1| null  | false      |
      | false  | Desc2 | null | true        | null        | id2 | list2  | Card2| null  | true       |

  @valid @smoke-test
  Scenario Outline: Mark a card as complete
    Given the card <id> exists
    When the card is marked as complete
    Then the card should be marked as complete

  @invalid @regression-test
  Scenario Outline: Attempt to mark a non-existing card as complete
    Given the card <id> does not exist
    When the card is marked as complete
    Then an error should be displayed

  Examples:
    | id  |
    | id3 |
    | id4 |
