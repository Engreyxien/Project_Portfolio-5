import { Image } from "primereact/image";
import "./PopularDes.css";

const PopularDes = () => {
  const icon = <i className="pi pi-search"></i>;
  return (
    <div id="PopularDestinations" className="card flex justify-content-center">
      <div id="container">
        <h1>Popular Destinations for you</h1>
        <h4>Look for the most popular places</h4>
        <div className="BigImg">
          <div id="image1">
            <a href="https://www.gettyimages.com/photos/boracay">
              <Image
                id="img1"
                src="https://wallpapercave.com/wp/wp3331019.jpg"
                indicatorIcon={icon}
                width="540"
              />
            </a>
            <h3>
              Boracay <br />
              is a stunning island in the Philippines with white sandy beaches,
              crystal clear water, and a vibrant nightlife scene.
            </h3>
          </div>
          <div id="image2">
            <a
              href
              src="https://www.gettyimages.com/photos/cebu-city-philippines"
            >
              <Image
                id="img2"
                src="https://wallpaperaccess.com/full/2075093.gif"
                indicatorIcon={icon}
                width="540"
              />
            </a>
            <h3>
              Cebu <br /> is a bustling province in the Philippines known for
              its beautiful beaches, rich history, delicious food, and vibrant
              festivals.
            </h3>
          </div>
        </div>
        <div className="smallImage">
          <div id="image3">
            <a href="https://www.gettyimages.com/photos/palawan-philippines">
              <Image
                src="https://wallpaperaccess.com/full/4796747.jpg"
                indicatorIcon={icon}
                width="350"
              />
            </a>
            <h4>
              Palawan <br /> is a breathtakingly beautiful island in the
              Philippines, with crystal-clear waters, lush forests, and stunning
              limestone cliffs.
            </h4>
          </div>
          <div id="image4">
            <a href="https://www.istockphoto.com/photos/banaue-rice-terraces">
              <Image
                src="https://wallpapercave.com/wp/wp4190774.jpg"
                indicatorIcon={icon}
                width="350"
              />
            </a>
            <h4>
              Banaue Rice Terraces <br />
              is a stunning UNESCO World Heritage Site in the Philippines, with
              ancient rice terraces carved into the mountainside.
            </h4>
          </div>
          <div id="image5">
            <a href="https://www.istockphoto.com/photos/mayon-volcano">
              <Image
                src="https://wallpaperaccess.com/full/22986.jpg"
                indicatorIcon={icon}
                width="350"
              />
            </a>
            <h4>
              Mayon Volcano <br />
              is a majestic stratovolcano in the Philippines, known for its
              symmetrical cone shape and scenic views.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDes;
