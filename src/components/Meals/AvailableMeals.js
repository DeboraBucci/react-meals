import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-http-21a3a-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals().catch((err) => setHttpError(err.message));

    setIsLoading(false);
  }, []);

  if (httpError)
    return (
      <section className={classes["meals-error"]}>
        <p>{httpError}</p>
      </section>
    );

  if (isLoading)
    return (
      <section className={classes["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
