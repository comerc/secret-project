https://www.youtube.com/watch?v=KajhOpfVCv0

---

Act as a quality analyst who is highly experienced in behavioural driven development and developing well-constructed Gherkin Scenarios from supplied requirements.

When I supply a requirement, I want you create full coverage in the following way:

- Use Gherkin BDD language and output as one entire code snippet for easy copying.
- Provide positive and negative scenarios.
- Ensure all common steps you created are added as a Gherkin ‘Background’.
- Ensure ‘Background’ is provided only once and is placed after the user story and before the scenarios.
- Ensure all variables used are created as a Gherkin ’Scenario Outline’.
- Ensure variables added to a Gherkin ‘Examples’ table appropriately.
- Include feature level tags and scenario level tags e.g., @valid, @invalid, @feature-example, @smoke-test, @regression-test.
- Provide feature and user story.
- Afterwards, suggest an appropriate name for the \*.feature file and explain your working.
- Do not assume any output like error messages or variables not part of the requirements.

Before you answer, I want you to do the following: If you have any questions about my task or uncertainty about delivering the best expert scenarios possible, always ask bullet point questions for clarification before generating your answer. Is that understood and are you ready for the requirements?

---

Give me an example requirements that may be used for building a website’s login page:

A: The login page must allow registered users to log in securely using their unique credentials (username/email and password).

-OR-

Write BDD scenario to open a bank account in XYZ with following criteria: ...

-OR-

Can you convert below requirement into test scenario:

User story: As a user, I want to be able to register for the service so that I can start shopping online.

Acceptance criteria:

- Users can only submit a form by filling in all the required fields.
- The email the user provides must not be provided by free email service.
- Submissions from the same IP can only be made three times within 30 minutes.
- Users receive notification emails after successfully registering.

-OR-

Can you convert below swagger into karate bdd get:

```
tags:
  - user
summary: Logs user into the system
description: ''
operationId: loginUser
parameters:
  - name: username
    in: query
    description: The user name for login
    required: false
    schema:
      type: string
  - name: password
    in: query
    description: The password for login in clear text
    required: false
    schema:
      type: string
responses:
  '200':
    description: successful operation
```

-OR-

It is Trello Clone. User story: As a user, I want to be able to create a new board to organize my tasks and projects. Please give me acceptance criteria for this user story.

A:

- When the user navigates to the homepage, they should see an option to create a new board.
- The user should be able to click on the "Create Board" button to initiate the board creation process.
- A form or modal should be displayed, allowing the user to enter a name for the new board.
- The user should be able to optionally select a background color or image for the new board.
- Upon submitting the form, the new board should be created and displayed on the homepage or in the user's list of boards.
- The new board should have the name and background chosen by the user.
- The user should be able to click on the newly created board to navigate to it and start organizing their tasks and projects.
- If the user cancels the creation of the new board, the form or modal should be closed and no board should be created.
- The system should handle any errors that may occur during the creation of the new board, such as duplicate board names or server issues.
- The user should be able to create multiple boards, each with a unique name and background.

-OR-

It is Trello Clone. Some data objects will have the following relationships (from RFP). Please give me GraphQL for this.

---
