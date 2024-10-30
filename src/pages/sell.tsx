import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import DefaultLayout from "@/layouts/default";
import toast from "react-hot-toast";
import abi from "@/abi.json";
import { useContractWrite } from "wagmi";

export default function SellPage() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  // Configure the contract write operation
  const config = {
    address: import.meta.env.VITE_CONTRACT_ADDRESS, // Your contract address
    abi: abi, // Your contract ABI
    functionName: "listProduct",
    args: [productName, productPrice],
  };

  const { write, isLoading, isSuccess } = useContractWrite(config);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!write) {
      toast.error("Contract write function not available");
      return;
    }

    // Execute the transaction
    try {
      await write();
    } catch (err: Error | any) {
      toast.error("Transaction error: " + (err.message || err));
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Listing product...", { id: "transactionStatus" });
    } else {
      toast.dismiss("transactionStatus");
    }

    if (isSuccess) {
      toast.success("Product listed successfully", { id: "transactionStatus" });
      // Reset the form fields on success
      setProductName("");
      setProductPrice("");
    }
  }, [isLoading, isSuccess]);

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sell Your Products</h1>
        <div className="max-w-md mx-auto">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div>
              <Input
                label="Product Name"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Input
                label="Price"
                id="productPrice"
                type="number"
                min="0"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              List Product
            </Button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}
