@feature-cards-due
Feature: Update Card Due Date
  As a user
  I want to update the due date of a card
  So that I can keep track of my tasks effectively

  Background:
    Given I am a registered user
    And I am logged in
    And I have existing cards with the following attributes:
      | closed | desc  | due  | dueComplete | dueReminder | id  | idList | name | start | subscribed |
      | true   | Desc1 | null | false       | null        | id1 | list1  | Card1| null  | false      |
      | false  | Desc2 | null | true        | null        | id2 | list2  | Card2| null  | true       |

  @valid @smoke-test
  Scenario Outline: Update the due date of a card
    Given the card <id> exists
    When the due date is updated to <newDueDate>
    Then the card due date should be <expectedDueDate>

    Examples:
      | id  | newDueDate  | expectedDueDate |
      | id1 | 2022-01-01  | 2022-01-01      |
      | id2 | 2022-02-15  | 2022-02-15      |

  @invalid @regression-test
  Scenario Outline: Attempt to update the due date of a non-existing card
    Given the card <id> does not exist
    When the due date is updated to <newDueDate>
    Then an error should be displayed

    Examples:
      | id  | newDueDate  |
      | id3 | 2022-01-01  |
      | id4 | 2022-02-15  |
