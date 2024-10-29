import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import store from './store';
import { addFavorite, removeFavorite, setRating } from './store';

const movies = [
  { id: 1, title: 'Inception', rating: 5 },
  { id: 2, title: 'The Matrix', rating: 4 },
  { id: 3, title: 'Interstellar', rating: 5 },
  { id: 4, title: 'Tenet', rating: 3 },
  { id: 5, title: 'Avatar', rating: 4 },
];

const MovieList = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FlatList
      data={filteredMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isFavorite = favorites.some(fav => fav.id === item.id);

        return (
          <View style={styles.movie}>
            <Text style={styles.movieText}>
              {item.title} - Rating: {item.rating}★
            </Text>
            {isFavorite ? (
              <View style={styles.favoriteOptions}>
                <Text style={styles.addedText}>Added to Favorite List</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => dispatch(removeFavorite(item.id))}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => dispatch(addFavorite(item))}
              >
                <Text style={styles.buttonText}>Add to Favorites</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    />
  );
};

const Favorites = ({ sortByRating }) => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const sortedFavorites = sortByRating
    ? [...favorites].sort((a, b) => b.rating - a.rating)
    : favorites;

  return (
    <FlatList
      data={sortedFavorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.favorite}>
          <Text style={styles.favoriteText}>
            {item.title} - Rating: {item.rating}★
          </Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => dispatch(setRating({ id: item.id, rating: star }))}
              >
                <Text style={star <= item.rating ? styles.activeStar : styles.inactiveStar}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => dispatch(removeFavorite(item.id))}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const ReduxFavoritesApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>{showFavorites ? 'Favorite Movies' : 'Movie List'}</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Button
          title={showFavorites ? 'Show All Movies' : 'Show Favorites'}
          onPress={() => setShowFavorites(!showFavorites)}
        />

        {showFavorites && (
          <Button
            title={`Sort by Rating: ${sortByRating ? 'On' : 'Off'}`}
            onPress={() => setSortByRating(!sortByRating)}
          />
        )}

        {showFavorites ? (
          <Favorites sortByRating={sortByRating} />
        ) : (
          <MovieList searchQuery={searchQuery} />
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  movie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  movieText: {
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addedText: {
    fontSize: 14,
    color: '#666',
  },
  favoriteOptions: {
    alignItems: 'flex-end',
  },
  favorite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteText: {
    fontSize: 18,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#F44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  activeStar: {
    fontSize: 18,
    color: '#FFD700',
  },
  inactiveStar: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default ReduxFavoritesApp;
