import React, { useState } from 'react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const InteractiveFAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  // Sample FAQ data with unique answers
  const faqItems: FaqItem[] = [
    { 
      id: 1, 
      question: 'How to place an order?',
      answer: 'To place an order, simply browse our catalog, select the items you want to purchase, and add them to your cart. Once you\'re ready to checkout, follow these steps:\n\n1. Review your cart contents\n2. Enter your shipping information\n3. Select your preferred payment method\n4. Confirm your order\n\nYou\'ll receive an order confirmation email with tracking information once your order has been processed.'
    },
    { 
      id: 2, 
      question: 'How can I make bulk orders?',
      answer: 'For bulk orders, we offer special pricing and dedicated support. You can place a bulk order by contacting our sales team directly at sales@example.com or by calling our customer service line at 1-800-123-4567. Please have the following information ready:\n\n- Product details and quantities\n- Delivery timeline requirements\n- Any special handling instructions\n\nOur team will prepare a custom quote based on your specific needs.'
    },
    { 
      id: 3, 
      question: 'What if my orders were wrongfully delivered?',
      answer: 'If your order was wrongfully delivered or you received incorrect items, please contact our customer support team within 48 hours of delivery. We\'ll need:\n\n- Your order number\n- Photos of the received items\n- A description of the issue\n\nOur team will investigate the situation and provide a resolution, which may include a replacement shipment, return instructions, or a refund depending on the circumstances.'
    },
    { 
      id: 4, 
      question: 'How can I make bulk orders?', 
      answer: 'For bulk orders, we offer special pricing and dedicated support. You can place a bulk order by contacting our sales team directly at sales@example.com or by calling our customer service line at 1-800-123-4567. Please have the following information ready:\n\n- Product details and quantities\n- Delivery timeline requirements\n- Any special handling instructions\n\nOur team will prepare a custom quote based on your specific needs.'
    },
    { 
      id: 5, 
      question: 'Can I return a bad order?',
      answer: 'Yes, you can return items that don\'t meet your expectations. Our return policy allows returns within 30 days of delivery for most products. To initiate a return:\n\n1. Log into your account and navigate to order history\n2. Select the order containing the item(s) you wish to return\n3. Follow the return instructions provided\n\nPlease note that certain items may have specific return restrictions. Return shipping costs may apply unless the return is due to our error.'
    },
    { 
      id: 6, 
      question: 'How can I access the manufacturers directly?',
      answer: 'We generally don\'t provide direct access to our manufacturers. However, if you have specific questions about a product\'s manufacturing process, materials, or other technical details, we can facilitate communication with our manufacturing partners on your behalf. Please send your inquiries to info@example.com with the subject line "Manufacturer Inquiry" and include:\n\n- Product details\n- Specific questions you have\n- Your contact information\n\nOur team will coordinate with the relevant manufacturer and get back to you with the information you need.'
    },
    { 
      id: 7, 
      question: 'How can I make bulk orders?',
      answer: 'For bulk orders, we offer special pricing and dedicated support. You can place a bulk order by contacting our sales team directly at sales@example.com or by calling our customer service line at 1-800-123-4567. Please have the following information ready:\n\n- Product details and quantities\n- Delivery timeline requirements\n- Any special handling instructions\n\nOur team will prepare a custom quote based on your specific needs.'
    },
    { 
      id: 8, 
      question: 'How can I make bulk orders?',
      answer: 'For bulk orders, we offer special pricing and dedicated support. You can place a bulk order by contacting our sales team directly at sales@example.com or by calling our customer service line at 1-800-123-4567. Please have the following information ready:\n\n- Product details and quantities\n- Delivery timeline requirements\n- Any special handling instructions\n\nOur team will prepare a custom quote based on your specific needs.'
    }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleQuestionClick = (id: number) => {
    setSelectedQuestion(id === selectedQuestion ? null : id);
  };

  // Filter FAQ items based on search query
  const filteredFaqItems = searchQuery
    ? faqItems.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <div className="font-roboto mx-auto py-[20px] md:py-[40px] px-[20px] md:px-[80px]">
      <div className="flex items-center space-x-2 text-gray-800 font-semibold mb-8">
        <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
        <h1 className="text-[20px] md:text-[24px] font-bold">Frequently Asked Questions</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column with FAQ items */}
        <div className="space-y-2">
          {filteredFaqItems.map((item) => (
            <div
              key={item.id}
              className={`p-4  cursor-pointer transition-colors ${
                selectedQuestion === item.id ? 'bg-[#F5F5F5]' : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => handleQuestionClick(item.id)}
            >
              <p className="text-[#2D2828] text-[16px] font-medium">{item.question}</p>
            </div>
          ))}
        </div>

        {/* Right column with search and answer */}
        <div className="space-y-4">
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search frequently asked questions"
              className="block w-full pl-10 pr-3 py-[20px] text-[14px] rounded-md leading-5 bg-[#E7EAEA] placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {selectedQuestion !== null && (
            <div className="bg-[#FFF6D9] p-4 border rounded border-yellow-100">
              <p className="text-gray-800 text-[16px] whitespace-pre-line">
                {faqItems.find(item => item.id === selectedQuestion)?.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveFAQPage;