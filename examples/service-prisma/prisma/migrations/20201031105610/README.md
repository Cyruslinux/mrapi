# Migration `20201031105610`

This migration has been generated by shawnnxiao(肖玉峰) at 10/31/2020, 6:56:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201028171307..20201031105610
--- datamodel.dml
+++ datamodel.dml
@@ -2,23 +2,32 @@
   provider = "prisma-client-js"
 }
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = ["sqlite", "mysql", "postgresql"]
+  url = "***"
 }
+/// This is user description
 model User {
+  id    Int     @id @default(autoincrement())
+  /// email description
   email String  @unique
-  id    Int     @id @default(autoincrement())
+  /// name description
   name  String?
+  /// posts description
   posts Post[]
 }
+/// This is post description
 model Post {
-  authorId  Int?
+  id        Int     @id @default(autoincrement())
+  /// title description
+  title     String
+  /// content description
   content   String?
-  id        Int     @id @default(autoincrement())
+  /// published description
   published Boolean @default(false)
-  title     String
+  /// author description
   author    User?   @relation(fields: [authorId], references: [id])
+  authorId  Int?
 }
```

