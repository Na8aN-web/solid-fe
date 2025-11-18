import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import DealsCard from './DealsCard';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { addProductToCart } from '../../../../store/slices/cartSlice';
import SuccessModal from '../../../../components/SuccessModal';

// Define product interface based on API response
interface DealProduct {
  _id: string;
  name: string;
  displayPrice: number;
  regularPrice: number;
  rating: number | null;
  numReviews: number;
  image: string;
  categoryName: string | null;
  brandName: string;
}

interface DealsResponse {
  products: DealProduct[];
}

const DealsOfTheDay = () => {
  const [dealProducts, setDealProducts] = useState<DealProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{ id: string, name: string } | null>(null);
  const dispatch = useAppDispatch();

  // Fetch deals of the day from API
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}products/deals`);

        if (!response.ok) {
          throw new Error(`Failed to fetch deals: ${response.status}`);
        }

        const data: DealsResponse = await response.json();
        setDealProducts(data.products);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch deals');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleAddToCart = async (productId: string, productName: string) => {
    const product = dealProducts.find(p => p._id === productId);

    if (!product) {
      console.error('Product not found');
      return;
    }

    // Prepare product data for cart
    const productData = {
      _id: product._id,
      name: product.name,
      images: [product.image],
      salesPrice: product.displayPrice,
      displayPrice: product.displayPrice,
      regularPrice: product.regularPrice,
      stockStatus: 'In Stock',
      brand: {
        _id: `brand-${product.brandName.toLowerCase().replace(/\s+/g, '-')}`,
        name: product.brandName
      },
      maker: product.brandName
    };

    try {
      setAddingProductId(productId);
      await dispatch(addProductToCart({
        productId,
        quantity: 1,
        productData
      })).unwrap();

      // Show success modal
      setLastAddedProduct({ id: productId, name: productName });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleViewCart = () => {
    setShowSuccessModal(false);
    // Navigate to cart page
    window.location.href = '/cart';
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setLastAddedProduct(null);
  };

  // Calculate discount percentage
  const calculateDiscount = (regularPrice: number, displayPrice: number): number => {
    return Math.round(((regularPrice - displayPrice) / regularPrice) * 100);
  };

  if (loading) {
    return (
      <section className="relative py-[20px] px-[20px]">
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Deals of the Day
            </h2>
          </div>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-[20px] px-[20px]">
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Deals of the Day
            </h2>
          </div>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (dealProducts.length === 0) {
    return (
      <section className="relative py-[20px] px-[20px]">
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Deals of the Day
            </h2>
          </div>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">No deals available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className=" py-[20px] px-[20px]">
        <div className="flex justify-between items-center py-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Deals of the Day
            </h2>
          </div>
          <div className="flex gap-3">
            <button className="custom-prev w-9 h-9 bg-white rounded-full border">
              ❮
            </button>
            <button className="custom-next w-9 h-9 bg-white rounded-full border">
              ❯
            </button>
          </div>
        </div>
        <div className='h-auto'>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            className="mySwiper"
            breakpoints={{
              1280: { slidesPerView: 2 },
            }}
          >
            {dealProducts.map((product) => {
              const discount = calculateDiscount(product.regularPrice, product.displayPrice);

              return (
                <SwiperSlide key={product._id}>
                  <DealsCard
                    image={product.image}
                    title={product.name}
                    category={product.categoryName || product.brandName}
                    price={`₦${product.displayPrice.toLocaleString()}`}
                    oldPrice={`₦${product.regularPrice.toLocaleString()}`}
                    discount={`-${discount}%`}
                    reviews={product.numReviews.toString()}
                    productId={product._id}
                    onAddToCart={handleAddToCart}
                    cartLoading={addingProductId !== null}
                    addingProductId={addingProductId}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>


      </section>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onViewCart={handleViewCart}
        productName={lastAddedProduct?.name}
      />
    </>
  );
};

export default DealsOfTheDay;