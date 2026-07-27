expect(Object.hasOwn(ashaAccount, 'deposit'), true, 'constructor method is an own property');
expect(Object.hasOwn(ashaAccount, 'getSummary'), false, 'prototype method is inherited');
expect(ashaAccount.deposit === raviAccount.deposit, false, 'instance method is recreated');
expect(ashaAccount.getSummary === raviAccount.getSummary, true, 'prototype method is shared');
expect(ashaAccount.getSummary(), 'Asha: $1000', 'shared method reads receiver state');
