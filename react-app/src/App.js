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
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <Route path='/recipes' exact={true}>
          <AllRecipes />
        </Route>
        <Route path='/recipes/:id'>
          <SingleRecipe/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
