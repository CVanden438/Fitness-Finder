type categoriesArr = ["General Fitness", "Weights", "Dance", "Yoga"];
type difficultiesArr = ["Beginner", "Intermediate", "Advanced"];
interface filters {
  category?: string;
  difficulty?: string;
  search?: string;
  page?: number;
  price?: number;
}
