# Lab 5 - Party Horn + Speech Synth

Name: Omar (TODO - update if needed)
Lab partner(s): none

## Pages

- expose page: TODO add github pages link after deploy
- explore page: TODO add github pages link after deploy

## CI Screenshots

- `myError.png` - failing CI on the testing branch PR
- `merged.png` - passing CI after fix is merged into main

## Unit testing - check your understanding

### Would you use a unit test for the "message" feature of a messaging app?

Probably not just a unit test on its own. The message feature pulls in a UI input, a network call, maybe a db write, and rendering on the other user's client. That's more integration / e2e territory. You could unit test pieces of it though, like a function that validates the message format, or one that builds the request payload before it hits the wire. The whole send/receive flow needs higher-level testing where you actually exercise the full path.

### Would you unit test "max message length" (caps at 80 chars)?

Yeah this is a great unit test target. Basically one pure function: given an input string, return whether it's allowed (or truncate, depending on impl). No UI, no network, no db, just input -> output. You'd test 80 chars passing, 81 failing, empty string, unicode/emoji handling (1 emoji can be multiple code units), maybe whitespace edge cases. Pure logic like this is exactly what unit tests are for.
