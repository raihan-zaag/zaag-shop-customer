"use client";
import { useState, useMemo } from "react";

export default function SubscriptionSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Memoized configuration to prevent re-renders
  const config = useMemo(() => ({
    title: "Choose the right plan to power your business growth.",
    subtitle: "Select a plan that's as unique as your business, with transparent pricing and scalable features",
    currency: "৳",
    containerClasses: "w-full py-16 flex flex-col items-center",
    gridClasses: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[95%] lg:w-[85%]",
    billingOptions: [
      {
        id: "monthly",
        label: "Monthly",
        suffix: "/Monthly"
      },
      {
        id: "yearly",
        label: "Yearly", 
        suffix: "/Yearly",
        badge: "Save 17%",
        badgeClasses: "ml-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full"
      }
    ],
    theme: {
      primary: {
        cardClasses: "bg-[#4B47FF] text-white scale-[1.03] border-transparent transform hover:scale-[1.05]",
        buttonClasses: "bg-white text-[#4B47FF] hover:bg-gray-100 hover:shadow-md",
        textClasses: {
          name: "text-white",
          title: "text-white", 
          price: "text-white",
          period: "text-white/80",
          originalPrice: "text-white/60",
          feature: "text-white",
          checkmark: "text-white"
        }
      },
      secondary: {
        cardClasses: "bg-white border-gray-200 hover:shadow-lg hover:border-[#4B47FF]/20 transform hover:scale-[1.05]",
        buttonClasses: "bg-[#111827] text-white hover:bg-[#374151] hover:shadow-md",
        textClasses: {
          name: "text-gray-700",
          title: "text-gray-600",
          price: "text-gray-900", 
          period: "text-gray-500",
          originalPrice: "text-gray-400",
          feature: "text-gray-600",
          checkmark: "text-[#4B47FF]"
        }
      }
    }
  }), []);

  // Memoized base plans data to prevent re-renders
  const basePlansData = useMemo(() => [
    {
      id: "standard",
      name: "Standard",
      title: "For Kickstarting Your Business", 
      pricing: {
        monthly: { price: 500, originalPrice: null },
        yearly: { price: 5000, originalPrice: 6000 }
      },
      primary: false,
      features: [
        "3 Themes",
        "Upto 100 Products",
        "Upto 300 Orders/month",
        "Invoice Generation", 
        "Payment Integration",
        "Customer Management",
        "Customer Accounts",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      title: "For Small and Medium Businesses",
      pricing: {
        monthly: { price: 1500, originalPrice: null },
        yearly: { price: 15000, originalPrice: 18000 }
      },
      primary: true,
      features: [
        "6 Themes",
        "Upto 200 Products",
        "Upto 1,000 Orders/month",
        "Delivery Partner Integration",
        "Fraud Detection",
        "Warehouse",
        "Previous plan included",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      title: "For Large Business",
      pricing: {
        monthly: { price: 2500, originalPrice: null },
        yearly: { price: 25000, originalPrice: 30000 }
      },
      primary: false,
      features: [
        "Premium & Custom Option",
        "Upto 5,000 Products",
        "Upto 5,000 Orders/month",
        "Fraud Detection",
        "Delivery Partner Integration",
        "Vendor Management",
        "Plugins",
        "Previous plan included",
      ],
    },
    {
      id: "custom",
      name: "Custom",
      title: "For Custom Solution",
      pricing: {
        monthly: { price: "Enterprise", originalPrice: null },
        yearly: { price: "Enterprise", originalPrice: null }
      },
      primary: false,
      isContact: true,
      features: [
        "Premium theme",
        "Unlimited product",
        "Unlimited order",
        "Shipping Partners Integration",
        "Delivery Partner Integration",
        "Inventory Management",
        "Other's many more",
      ],
    },
  ], []);

  // Dynamic plan processing
  const processedPlans = useMemo(() => {
    const currentBillingOption = config.billingOptions.find(option => option.id === billingCycle);
    
    return basePlansData.map(plan => {
      // Safety check for pricing data
      if (!plan.pricing || !plan.pricing[billingCycle]) {
        console.error(`Missing pricing data for plan ${plan.name} and billing cycle ${billingCycle}`);
        return {
          ...plan,
          displayPrice: "N/A",
          period: "",
          originalPrice: null,
          savingsPercentage: null
        };
      }

      const pricingData = plan.pricing[billingCycle];
      const displayPrice = typeof pricingData.price === 'number' 
        ? `${config.currency}${pricingData.price.toLocaleString()}`
        : pricingData.price;
      
      const originalPrice = pricingData.originalPrice 
        ? `${config.currency}${pricingData.originalPrice.toLocaleString()}`
        : null;

      const savingsPercentage = pricingData.originalPrice && typeof pricingData.price === 'number'
        ? Math.round(((pricingData.originalPrice - pricingData.price) / pricingData.originalPrice) * 100)
        : null;

      return {
        ...plan,
        displayPrice,
        period: currentBillingOption.suffix,
        originalPrice,
        savingsPercentage
      };
    });
  }, [billingCycle, config, basePlansData]);

  // Dynamic theme getter
  const getTheme = (plan) => plan.primary ? config.theme.primary : config.theme.secondary;

  // Dynamic action handlers
  const handlePlanClick = (plan) => {
    if (plan.isContact) {
      // Handle contact action
      window.location.href = '/contact-us';
    } else {
      // Handle subscription action  
      window.location.href = `/checkout?plan=${plan.id}&cycle=${billingCycle}`;
    }
  };

  const handleBillingCycleChange = (cycleId) => {
    setBillingCycle(cycleId);
  };

  return (
    <div className={config.containerClasses}>
      <h1 className="text-4xl font-bold text-center mb-3">
        {config.title.split(' ').slice(0, 8).join(' ')} <br /> {config.title.split(' ').slice(8).join(' ')}
      </h1>

      <p className="text-gray-500 text-center mb-8">
        {config.subtitle}
      </p>

      {/* Dynamic Navigation Tabs */}
      <div className="flex border rounded-full p-1 bg-white mb-10 shadow-sm">
        {config.billingOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleBillingCycleChange(option.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
              billingCycle === option.id
                ? "bg-[#4B47FF] text-white"
                : "text-gray-600 hover:text-[#4B47FF]"
            }`}
          >
            {option.label}
            {option.badge && (
              <span className={option.badgeClasses}>
                {option.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className={config.gridClasses}>
        {processedPlans.map((plan) => {
          const theme = getTheme(plan);
          return (
            <div
              key={plan.id}
              className={`w-full rounded-xl border shadow-sm p-6 transition-all duration-300 ${theme.cardClasses}`}
              //onClick={() => handlePlanClick(plan)}
            >
              <p className={`text-sm font-medium mb-1 ${theme.textClasses.name}`}>
                {plan.name}
              </p>

              <p className={`text-base mb-4 ${theme.textClasses.title}`}>
                {plan.title}
              </p>

              <div className="flex items-end gap-1 mb-4">
                <span className={`text-3xl font-bold ${theme.textClasses.price}`}>
                  {plan.displayPrice}
                </span>
                {!plan.isContact && (
                  <span className={`text-sm ${theme.textClasses.period}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Dynamic Original Price & Savings Display */}
              {plan.originalPrice && (
                <div className="mb-4">
                  <span className={`text-sm line-through ${theme.textClasses.originalPrice}`}>
                    {plan.originalPrice}/Yearly
                  </span>
                  <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Save {plan.savingsPercentage}%
                  </span>
                </div>
              )}

              {/* Dynamic Action Button */}
              <button
                className={`w-full font-medium text-center rounded-md py-3 mb-6 transition-all duration-300 cursor-pointer ${theme.buttonClasses} hover:shadow-md`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanClick(plan);
                }}
              >
                {plan.isContact ? "Contact Us" : "Get Started Now"}
              </button>

              <div className="flex flex-col gap-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={`text-lg ${theme.textClasses.checkmark}`}>
                      ✓
                    </span>
                    <span className={`text-sm ${theme.textClasses.feature}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
