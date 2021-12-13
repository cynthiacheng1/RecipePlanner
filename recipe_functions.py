
#master list 
#['apple', 'avocado', 'bacon', 'baking soda', 'balsamic vinegar', 'bananas', 'basil', 'black pepper', 'bread', 'broccoli', 'brown sugar', 'brussel sprouts', 'butter', 'carrot', 'celery', 'cheese', 'chicken', 'chicken broth', 'chocolate chips', 'cinnamon', 'egg', 'flour', 'frozen vegetables', 'garlic', 'heavy cream', 'lemon', 'maple syrup', 'milk', 'mustard', 'nutmeg', 'oil', 'olive oil', 'onion', 'parmesan', 'parsley', 'pasta', 'pepper', 'pie crust', 'pine nuts', 'red pepper flakes', 'rice', 'salt', 'scallions', 'sesame oil', 'shallots', 'shrimp', 'soy sauce', 'sugar', 'sunflower seeds', 'tomato', 'vanilla extract', 'white wine']


#function to encode list of ingredients into one hot encoded list
def one_hot_encode(l):
    all_ingredients = ['apple', 'avocado', 'bacon', 'baking soda', 'balsamic vinegar', 'bananas', 'basil', 'black pepper', 'bread', 'broccoli', 'brown sugar', 'brussel sprouts', 'butter', 'carrot', 'celery', 'cheese', 'chicken', 'chicken broth', 'chocolate chips', 'cinnamon', 'egg', 'flour', 'frozen vegetables', 'garlic', 'heavy cream', 'lemon', 'maple syrup', 'milk', 'mustard', 'nutmeg', 'oil', 'olive oil', 'onion', 'parmesan', 'parsley', 'pasta', 'pepper', 'pie crust', 'pine nuts', 'red pepper flakes', 'rice', 'salt', 'scallions', 'sesame oil', 'shallots', 'shrimp', 'soy sauce', 'sugar', 'sunflower seeds', 'tomato', 'vanilla extract', 'white wine']
    encoded_lst = [0]*52
    for i in range(len(l)):
        ind = all_ingredients.index(l[i])
        encoded_lst[ind] = 1
    return encoded_lst

#ex. 
#print(one_hot_encode(['butter', 'onion','celery','chicken broth','chicken','pasta','carrot','basil','salt','pepper']))


#function to find recipes based on the user list of ingredients 
#cleaned_ingr : ex. [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1]
#all_recipe_ingr : 2D list of recipes 
#ex. (all the recipes in database below)
#all_recipe_ingr = all_recipe_ingr = [
#  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
#  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
#  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
#  [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#  [0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
#  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
#  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
#  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
#  ]

def searchRecipes(cleaned_ingr,all_recipe_ingr):
    res = []
    recipes = [i for i in range(1,len(all_recipe_ingr)+1)]
    for i in range(len(all_recipe_ingr)):
        res = [a_i - b_i for a_i, b_i in zip(cleaned_ingr, all_recipe_ingr[i])]
        for j in range(len(all_recipe_ingr[i])):
            if all_recipe_ingr[i][j] == 1:
                if res[j] != 0:
                    recipes.remove(i+1)
                    break
    return recipes 
#returns a list of all the recipe ids that match 

# ex. print(searchRecipes([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],all_recipe_ingr))

#returns ID of recipe if tag is in recipe tags 
#tag (tag user searches for) Ex. italian
#recipe tags (located in recipe db ) ex. ['italian','vegetarian']
#id pass the id of the recipe along (located in recipe db )
def searchRecipeTag(tag,recipe_tags,id):
    if (tag.strip.lower() in recipe_tags.strip.lower()):
        return id 

#Add Recipe 
#insert into DB 
#use one_hot_encode() to convert user's ingredient list into 0s and 1s 

#Add/Remove Ingredients from pantry 
# all_ingredients = ['apple', 'avocado', 'bacon', 'baking soda', 'balsamic vinegar', 'bananas', 'basil', 'black pepper', 'bread', 'broccoli', 'brown sugar', 'brussel sprouts', 'butter', 'carrot', 'celery', 'cheese', 'chicken', 'chicken broth', 'chocolate chips', 'cinnamon', 'egg', 'flour', 'frozen vegetables', 'garlic', 'heavy cream', 'lemon', 'maple syrup', 'milk', 'mustard', 'nutmeg', 'oil', 'olive oil', 'onion', 'parmesan', 'parsley', 'pasta', 'pepper', 'pie crust', 'pine nuts', 'red pepper flakes', 'rice', 'salt', 'scallions', 'sesame oil', 'shallots', 'shrimp', 'soy sauce', 'sugar', 'sunflower seeds', 'tomato', 'vanilla extract', 'white wine']
# ind = all_ingredients.index(l[i])
#get the index the ingredient is located ^ using above python function 
#use the index and set it to 0 in the pantry ingredient list 

#search recipes from pantry 
#use search function 
#cleaned_ingr = pantry ingredients 

#get all info about one recipe
#using recipe ID, select info from db 

#get all recipes
#select all recipes from db 