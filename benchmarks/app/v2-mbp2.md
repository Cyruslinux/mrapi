
# MBP 2

- `sysctl -n machdep.cpu.brand_string`: Intel(R) Core(TM) i9-9880H CPU @ 2.30GHz
- `sysctl hw.memsize`: 68719476736

## has cache

- node: v15
- `autocannon -c=100 -p=5 -d=5 http://localhost:3000`

```bash

┌─────────┬─────────┬────────┬─────────────────────────┬──────────────────────┬────────────────────────────┐
│         │ Version │ Router │ Requests/s (% of mrapi) │ Latency (% of mrapi) │ Throughput/Mb (% of mrapi) │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ mrapi   │ 1.0.0   │ ✓      │ 69510.4 (100.00)        │ 1.33 (100.00)        │ 8.95 (100.00)              │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ bare    │ 15.0.0  │ ✗      │ 61993.6 (89.19)         │ 1.51 (113.53)        │ 7.98 (89.20)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ polka   │ 0.5.2   │ ✓      │ 55472 (79.80)           │ 1.69 (127.07)        │ 7.14 (79.81)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ restana │ 4.8.0   │ ✓      │ 54204.8 (77.98)         │ 1.74 (130.83)        │ 6.98 (78.01)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ fastify │ 3.7.0   │ ✓      │ 53929.6 (77.58)         │ 1.75 (131.58)        │ 9.05 (101.17)              │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ koa     │ 2.13.0  │ ✓      │ 41820.81 (60.16)        │ 2.28 (171.43)        │ 7.02 (78.44)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ connect │ 3.7.0   │ ✗      │ 34051.2 (48.99)         │ 2.82 (212.03)        │ 4.38 (49.01)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ express │ 4.17.1  │ ✓      │ 18460 (26.56)           │ 5.27 (396.24)        │ 2.38 (26.57)               │
└─────────┴─────────┴────────┴─────────────────────────┴──────────────────────┴────────────────────────────┘

```

- node: v15
- `autocannon -c=100 -p=5 -d=5 http://localhost:3000`
- 1000 middlewares

```bash
┌─────────┬─────────┬────────┬─────────────────────────┬──────────────────────┬────────────────────────────┐
│         │ Version │ Router │ Requests/s (% of mrapi) │ Latency (% of mrapi) │ Throughput/Mb (% of mrapi) │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ mrapi   │ 1.0.0   │ ✓      │ 61468.8 (100.00)        │ 1.52 (100.00)        │ 7.91 (100.00)              │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ bare    │ 15.0.0  │ ✗      │ 61379.2 (99.85)         │ 1.53 (100.66)        │ 7.90 (99.87)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ polka   │ 0.5.2   │ ✓      │ 60668.8 (98.70)         │ 1.55 (101.97)        │ 7.81 (98.71)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ fastify │ 3.7.0   │ ✓      │ 56675.2 (92.20)         │ 1.66 (109.21)        │ 9.51 (120.17)              │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ restana │ 4.8.0   │ ✓      │ 54128 (88.06)           │ 1.74 (114.47)        │ 6.97 (88.05)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ koa     │ 2.13.0  │ ✓      │ 44336 (72.13)           │ 2.15 (141.45)        │ 7.44 (94.05)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ express │ 4.17.1  │ ✓      │ 18891.2 (30.73)         │ 5.15 (338.82)        │ 2.43 (30.73)               │
├─────────┼─────────┼────────┼─────────────────────────┼──────────────────────┼────────────────────────────┤
│ connect │ 3.7.0   │ ✗      │ 8950.8 (14.56)          │ 10.94 (719.74)       │ 1.15 (14.56)               │
└─────────┴─────────┴────────┴─────────────────────────┴──────────────────────┴────────────────────────────┘