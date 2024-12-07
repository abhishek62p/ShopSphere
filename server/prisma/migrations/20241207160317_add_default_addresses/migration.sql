-- AlterTable
ALTER TABLE "address" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "defaultBillingAddress" INTEGER,
ADD COLUMN     "defaultShippingAddress" INTEGER;
