import {
    UsersIcon,
    BellIcon,
    ShoppingBagIcon,
    ChevronRightIcon,
  } from "lucide-react";
  
  export default function IconSectionDescriptionOnLeftIconBlocksOnRight() {
    return (
      <>
        {/* Icon Blocks */}
        <div className="container py-24 lg:py-32">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="lg:w-3/4">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Hyperlocal trading for your campus community
              </h2>
              <p className="mt-3 text-muted-foreground">
                Sorted connects you with your campus community, making it easy to buy, sell, and trade items locally. Sign up with your SNU Email ID and start sorting requests and ads today.
              </p>
              <p className="mt-5">
                <a
                  className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                  href="#"
                >
                  Learn more about how Sorted works
                  <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
                </a>
              </p>
            </div>
            {/* End Col */}
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                  <UsersIcon className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Join campus communities
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Sign up with your SNU Email ID and join various campus communities. Connect with peers who share your interests and needs.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border  bg-primary text-primary-foreground">
                  <ShoppingBagIcon className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Post requests and ads
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Looking to buy or sell? Easily post requests for items you need or create ads for things you want to sell within your community.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                  <BellIcon className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Get notified and sort deals
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Receive notifications for new requests and ads in your community. Click to connect with the poster and negotiate a successful deal.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Icon Blocks */}
      </>
    );
  }