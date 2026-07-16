expect(duck.fly(), 'Duck flies', 'duck receives flying behavior');
expect(duck.swim(), 'Duck swims', 'duck receives swimming behavior');
expect(airplane.fly(), 'Plane flies', 'unrelated object reuses flying behavior');
expect(airplane.swim, undefined, 'object receives only selected capabilities');
expect(duck.fly === airplane.fly, true, 'composed behavior can still be shared');
