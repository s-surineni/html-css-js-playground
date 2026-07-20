expect(Object.hasOwn(savingsAccount, 'describe'), false, 'delete removes the override');
expect(
  savingsAccount.describe(),
  "Asha's account balance is ₹5000",
  'deleting override reveals inherited method',
);
savingsAccount.describe = function () {
  return `${this.owner}'s savings balance is ${this.getBalance()}`;
};
expect(
  savingsAccount.describe(),
  "Asha's savings balance is ₹5000",
  'own method overrides inherited method',
);
