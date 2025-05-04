import React from "react";

interface Product {
  id: number;
  title: string;
  status: string;
  message: string;
  image: string;
}

const Messages = () => {
  const pendingProducts: Product[] = [
    {
      id: 1,
      title: "Performance Exhaust System",
      status: "Package Received",
      message:
        "2354857892089 has been delivered. You can rate your product to let other people know about it. Not satisfied with the product? You can return it within 7 days from now! Thank you",
      image: "/tyres.svg",
    },
    // Add more products as needed
  ];
  return (
    <div>
      <h1 className="text-customBrown font-bold text-xl pb-4">Messages</h1>
      <section>
        {pendingProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-[20px] border-gray-200 p-4 w-full flex items-start justify-center gap-4 md:gap-6"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[100px] h-[105px]"
            />
            <div className="flex flex-col justify-between ">
              <h2 className="text-base text-customGray3 font-normal leading-tight pb-2">
                {product.title}
              </h2>
              <p className="font-semibold text-xl text-customBrown pb-3">
                {product.status}
              </p>
              <p className="font-normal text-xs text-customGray3">
                Package with Order no: <br /> {product.message}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Messages;
