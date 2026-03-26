# E-commerce Site Updates

Here is a summary of the changes made to the site based on your requests:

## Changed Files

1.  **`src/components/BannerSlider.tsx` (New)**: Created a new component for the homepage banner slider. It supports multiple slides, swiping, and uses `loading="eager"` for immediate visibility. It references images in the `/images/banners` directory.
2.  **`src/components/Home.tsx`**: Replaced the static hero section with the new `BannerSlider` component.
3.  **`src/components/Shop.tsx`**: Added `loading="eager"` to product images to ensure immediate visibility and prevent lazy-loading issues.
4.  **`src/components/ProductModal.tsx`**: Added `loading="eager"` to the main product image and thumbnail images.
5.  **`src/components/CartDrawer.tsx`**: Added `loading="eager"` to the product images in the cart.
6.  **`src/components/Checkout.tsx`**: Modified the checkout process to use WhatsApp. The "Place Order" button now opens a new tab with a pre-populated WhatsApp message containing the order details, customer name, and address. Payment fields were made optional.
7.  **`index.html`**: Injected the Chatway chatbot script (`<script id="chatway" async="true" src="https://cdn.chatway.app/widget.js?id=yr5KFl2TVU7F"></script>`) into the `<body>` tag. It loads asynchronously to prevent blocking rendering.

## Image Upload Locations

*   **Product Images**: Place all product images in the `/public/images/` directory. Ensure the filenames exactly match those referenced in `src/data.ts` and `product_image_mapping.csv`.
*   **Banner Images**: Place all banner images in the `/public/images/banners/` directory.
    *   Currently, the `BannerSlider` is configured to look for:
        *   `banner1.jpg`
        *   `banner2.jpg`
        *   `banner3.jpg`
    *   *Note: If your filenames are different, you will need to update the `BANNERS` array at the top of `src/components/BannerSlider.tsx`.*

## Staging URL for QA

You can review all changes, including the banners, feature images, WhatsApp checkout, and the chatbot, at the following staging URL:

**https://ais-pre-papkdmbeosisctiwonu3hm-192445919090.europe-west2.run.app**

*(Note: If you are viewing this within the AI Studio interface, you can also use the live preview pane on the right).*
