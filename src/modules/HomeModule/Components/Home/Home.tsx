import Hero from "../Hero/Hero";
import CategoriesSwiper from "../ExploreCate/CategoriesSwiper";
import NewReleaseBooks from "../NewReleaseBooks/NewReleaseBooks";
import FeaturedBookSlider from "../FeaturedBookSlider/FeaturedBookSlider";
import BookDealSlider from "../BookDealSlider/BookDealSlider";
import NewsletterSection from "../NewsletterSection/NewsletterSection";
import LatestArticles from "../LatestArticles/LatestArticles";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSwiper />
      <NewReleaseBooks />
      <FeaturedBookSlider />
      <BookDealSlider />
      <NewsletterSection />
      <LatestArticles />
    </>
  );
}
