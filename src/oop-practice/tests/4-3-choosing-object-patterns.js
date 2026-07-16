expect(appSettings.theme, 'dark', 'plain object represents one shared value');
expect(session.isActive, true, 'factory exposes private state through its API');
session.close();
expect(session.isActive, false, 'factory method updates private state');
expect(legacyUser instanceof LegacyUser, true, 'constructor creates identifiable instances');
expect(modernUser instanceof User, true, 'class creates identifiable instances');
expect(legacyUser.greet(), 'Hello, Bruce', 'constructor shares prototype behavior');
expect(modernUser.greet(), 'Hello, Natasha', 'class shares prototype behavior');
