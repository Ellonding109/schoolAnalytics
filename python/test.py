
import matplotlib.pyplot as plt
from mpl_toolkits import mplot3d

class MyClass:
    def __new__(cls, name):
        print("--- In __new__ ---")
        # Create and return a new instance of MyClass
        # It returns the actual object, not just configures it
        instance = super().__new__(cls) 
        return instance

    def __init__(self, name):
        print("--- In __init__ ---")
        self.name = name # Now initialize the created instance
        print(f"Instance created with name: {self.name}")
ob = MyClass("bravo")

def format_string(string, formatter=None):
    '''Format a string using the formatter object, which
    is expected to have a format() method that accepts
    a string.'''
    class DefaultFormatter:
        
        def format(self, string):
            return str(string).title()
    if not formatter:
        formatter = DefaultFormatter()
    return formatter.format(string)
hello_string = "hello world, how are you today?"
print(" input: " + hello_string)
print("output: " + format_string(hello_string))


# print ("othere way to wright the calasses")
# def string_fomater(string, fomatter = None):
#     '''create a sting to be formated'''

#     class formatstring:
#         '''create the method to work on the stirng'''
#         def string(string,formatter):
#             return str(string).title()
       
#     if not fomatter:
#         '''create formatter'''

#         Fomatter = fomatter();
#     return Fomatter.format(string)
# '''initialize the string to be formated'''

# hello_sting = "hello there the journey towards getting to be a senior data scientisr is getting much more exiting "
# print(f"the string is {hello_sting}")

# print("formated = " + string_fomater(hello_sting))

# single points

ax = plt.axes(projection = "3d")
ax.scatter(3,5,7)
plt.show()


# %%
# Import necessary libraries
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np

# Create data: Generate 100 points for a 3D spiral
z = np.linspace(0, 1, 100)
x = z * np.sin(25 * z)
y = z * np.cos(25 * z)
c = x + y # Color array based on x and y values

# Create the figure and a 3D axis
fig = plt.figure(figsize=(8, 6))
# Using 'projection="3d"' automatically uses the mplot3d toolkit
ax = fig.add_subplot(111, projection='3d') 

# Create the 3D scatter plot
ax.scatter(x, y, z, c=c, cmap='viridis')

# Set labels and title
ax.set_xlabel('X Axis')
ax.set_ylabel('Y Axis')
ax.set_zlabel('Z Axis')
ax.set_title('3D Scatter Plot in VS Code')

# Display the plot in the Interactive Window
plt.show()

# %%


