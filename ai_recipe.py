# ai_recipe.py
from transformers import pipeline

def generate_recipe(ingredients):
    recipe_generator = pipeline('text-generation', model='meta-llama/META_LLAMA3_PATH')
    prompt = f"Create a recipe using the following ingredients: {ingredients}"
    result = recipe_generator(prompt, max_length=100)
    return result[0]['generated_text']

if __name__ == "__main__":
    import sys
    ingredients = sys.argv[1]
    print(generate_recipe(ingredients))
