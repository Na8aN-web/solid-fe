import React, { useState, useEffect } from "react";

const SavedItems = () => {
  const items = Array.from({ length: 12 });
  const allItems = Array.from({ length: 30 }); // replace this with real data
  const totalItems = allItems.length;
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  // Get items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-customBrown font-medium text-xl pb-4">Saved Items</h1>
      <section className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {currentItems.map((_, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-[20px] p-3 lg:p-4"
          >
            <div className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] bg-[#E6EBF0] flex items-center justify-center rounded ml-auto">
              <img src="/favorite.svg" alt="" className="w-[15px]" />
            </div>
            <div className="w-[38px] h-[38px] bg-primary rounded-[20px] flex items-center justify-center">
              <span className="text-xs font-normal text-white">-18%</span>
            </div>
            <img
              src="/bumper.svg"
              alt=""
              className="w-full h-[110px] lg:h-[200px]"
            />
            <div className="space-y-1 pb-3 pt-5 lg:space-y-2 lg:pb-5 lg:pt-7">
              <h2 className="text-[10px] font-semibold text-customGray2 truncate">
                BODY PARTS
              </h2>
              <p className="text-sm font-medium text-customBrown">
                Bumper (Toyota Highlander 2017)
              </p>
              <div className="flex items-center gap-1">
                <img src="/stars.svg" alt="stars" />
                <span className="text-xs md:text-sm font-medium text-customGray3">
                  (88 Reviews)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-customBrown">
                  60,000.00
                </p>
                <p className="text-[11px] font-semibold text-customGray3 line-through">
                  80,000.00
                </p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 border rounded border-primary py-3 px-1 w-full bg-primary">
              <img src="/cart-w.svg" alt="cart" className="w-[13px]" />
              <span className="text-[11px] text-sm text-white font-semibold">
                Add to cart
              </span>
            </button>
          </div>
        ))}
      </section>
      <div className="flex justify-center items-center gap-2 pt-6 pb-3">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="h-[35px] w-[35px] border rounded-3xl disabled:opacity-50 flex justify-center"
        >
          <img src="/next.svg" alt="" className="w-[5px] rotate-180" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-3xl ${
              currentPage === i + 1 ? "bg-primary text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="h-[35px] w-[35px] border rounded-3xl disabled:opacity-50 flex justify-center"
        >
          <img src="/next.svg" alt="" className="w-[5px]" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-xs text-customBrown">
          {currentPage}-{itemsPerPage} of {totalItems} Products
        </p>
      </div>
    </div>
  );
};

export default SavedItems;
