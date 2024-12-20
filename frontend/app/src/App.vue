<script>
import HelloWorld from './components/HelloWorld.vue'
export default {   
  name: "AlertButton",   
    methods: {
      async fetchBooks() {
        try {         
          const response = await fetch("http://localhost:3000/books?count=5&page=1");         
          if (!response.ok) {           
            throw new Error("Failed to fetch books.");         
          }         
          this.books = await response.json();       
        } 
        catch (error) {         
          console.error("Error fetching books:", error);       
        }
      },
      async deleteBook(bookId) {
        try {
          const response = await fetch(`http://localhost:3000/books/${bookId}`, {
          method: 'DELETE',
        }); 
        if (response.ok) {
        // Remove the book from the local list after successful deletion
        this.books = this.books.filter(book => book.id !== bookId);
        console.log(`Book with ID ${bookId} deleted successfully.`);
        } else {
          console.error('Failed to delete the book:', response.statusText);
        }
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      }, 
      async submitForm(data) {
      console.log(data);
      try {
        const response = await fetch("http://localhost:3000/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });
        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
    data() {
    return {
      formData: {        
        author: "",
        title: "",
        year: null,
      },
      books: [
        
      ]
    }
  },
 };
</script>

<template>
<form @submit.prevent="submitForm">
      <div>
        <label for="author">Author:</label><br>
        <input
          type="text"
          id="author"
          v-model="formData.author"
          required          
          placeholder="Author"
        />
      </div>
      <div>
        <label for="title">Book Title:</label><br>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          required          
          placeholder="title"
        />
      </div>

      <div>
        <label for="year">Year:</label><br>
        <input
          type="number"
          id="year"
          v-model.number="formData.year"
          required          
          placeholder="year"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <table border="2px" cellspacing="0" cellpadding="15" v-if="books.length">      
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Year</th>
        <th>Actions</th>
      </tr>       
        <tr v-for="(book, index) in books" :key="index">           
          <td>{{ book.author }}</td>           
          <td>{{ book.title }}</td>           
          <td>{{ book.year }}</td>
          <td><button @click="deleteBook(book.id)">delete</button></td>          
        </tr>      
    </table>
    <p v-else>No books available. Click load to load data</p>
    <button @click="fetchBooks">Load</button>    
</template>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
