import React, { useEffect, useState, useMemo } from "react";

export const App = () => {
  const initialState = {
    foods: [
      {
        id: 1,
        title: "apple",
        category: 1
      },
      {
        id: 2,
        title: "tomato",
        category: 2
      },
      {
        id: 3,
        title: "pork",
        category: 3
      },
      {
        id: 4,
        title: "salmon",
        category: 4
      }
    ],
    categories: [
      {
        id: 1,
        title: "fruits"
      },
      {
        id: 2,
        title: "vegetable"
      },
      {
        id: 3,
        title: "meat"
      },
      {
        id: 4,
        title: "fish"
      }
    ]
  };

  const [newFoods, setNewFoods] = useState("");
  const [newFoodsCategories, setNewFoodsCategories] = useState("");
  const [foods, setFoods] = useState(initialState.foods);
  const [categories, setCategories] = useState(initialState.categories);
  const [filterQuery, setFilterQuery] = useState({});

  // const onClickFoodAdd = () => {};

  console.log("a");

  const filteredFood = useMemo(() => {
    // let tmpFoods = foods;
    const filterTitle = filterQuery.title && filterQuery.title.toLowerCase();

    const tmpFoods = foods.filter((row) => {
      if (
        filterQuery.title &&
        String(row.title).toLowerCase().indexOf(filterTitle) === -1
      ) {
        return false;
      }
      if (
        filterQuery.category_id &&
        row.category !== parseInt(filterQuery.category_id)
      ) {
        return false;
      }
      return row;
    });
    return tmpFoods;
  }, [filterQuery, foods]);

  const onClickFoodAdd = () => {
    const createdFood = [...foods, newFoods];
    setFoods(createdFood);
  };

  const handleNewFoods = (e) => {
    setNewFoods(e.target.value);
  };

  const handleNewFoodsCategories = (e) => {
    setNewFoodsCategories(e.target.value);
  };

  const handleFilter = (event) => {
    const { name, value } = event.target;
    setFilterQuery({ ...filterQuery, [name]: value });
  };

  return (
    <>
      <div>
        <div>
          <form>
            <input
              name="title"
              type="text"
              placeholder="Add Food"
              value={newFoods}
              onChange={handleNewFoods}
            />
            <select
              value={newFoodsCategories}
              onChange={handleNewFoodsCategories}
            >
              <option value="">category</option>
              {categories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <button onClick={onClickFoodAdd}>追加</button>
          </form>
        </div>
        <div>
          <p>filter</p>
          <input
            type="text"
            name="title"
            placeholder="search"
            value={filterQuery.title || ""}
            onChange={handleFilter}
          />
          <select
            name="category_id"
            value={filterQuery.category_id || ""}
            onChange={handleFilter}
          >
            <option value="">category</option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>Food</p>
          <ul>
            {filteredFood.map((food) => {
              return <li key={food.id}>{food.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
