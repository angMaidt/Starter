import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import AllRecipes from './components/Recipes/AllRecipes/AllRecipes';
import { authenticate } from './store/session';
import { getRecipesThunk } from './store/recipe';
import SingleRecipe from './components/Recipes/SingleRecipe/SingleRecipe';
// import RecipeForm from './components/Recipes/RecipeForms/RecipeForm';
import MyRecipes from './components/Recipes/MyRecipes/MyRecipes';
// import LeftNav from './components/LeftNavigation/LeftNav';
import HomePage from './components/HomePage/HomePage';
import SearchResults from './components/Search/SearchResults';
import Footer from './components/Footer';
// import SystemProvider from './context/SystemContext';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const recipes = useSelector(state => state.recipes)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    //Fetching all recipes
    const fetchRecipes = async () => {
      await dispatch(getRecipesThunk())
    }
    fetchRecipes().catch(console.error)
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      {/* <div className='welcome-ribbon'></div> */}
      <div className='bottom-screen'>
        {/* <div className='view-screen'> */}
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path='/users' exact={true} >
              <UsersList/>
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute>
            <Route path='/' exact={true} >
              {/* <h1>My Home Page</h1> */}
              <HomePage />
            </Route>
            <Route path='/recipes' exact={true}>
              <AllRecipes />
            </Route>
            <Route path='/recipes/search/:term' exact={true}>
              <SearchResults />
            </Route>
            <ProtectedRoute path='/my-recipes' exact={true} >
              <MyRecipes />
            </ProtectedRoute>
            <Route path='/recipes/:id'>
              <SingleRecipe/>
            </Route>
          </Switch>
        {/* </div> */}
    </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
