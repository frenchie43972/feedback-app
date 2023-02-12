import Card from "../components/shared/Card";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is a simple React app that allows you to leave a review for a product or service.</p>
        <p>Version 1.0.0</p>
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
      
    </Card>
  );
}

export default AboutPage;
