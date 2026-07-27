expect(ashaAccount.accountInfo, 'Asha: $1500', 'setter updates account information');
expect(Object.hasOwn(ashaAccount, 'accountInfo'), false, 'accessor is inherited');
expect(descriptor.enumerable, false, 'descriptor makes accessor non-enumerable');
expect(typeof descriptor.get, 'function', 'descriptor contains a getter');
expect(ashaAccount.constructor, BankAccount, 'prototype constructor link remains intact');
