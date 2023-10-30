import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
from tensorflow import keras
import numpy as np

# import matplotlib.pyplot as plt

mnist = keras.datasets.mnist

(x_train, y_train), (x_test, y_test) = mnist.load_data()
# num = 25
# images = x_train[:num]
# labels = y_train[:num]
#
# num_row = 5
# num_col = 5
# plot images
# fig, axes = plt.subplots(num_row, num_col, figsize=(1.5 * num_col, 2 * num_row))
# for i in range(num):
#    ax = axes[i // num_col, i % num_col]
#    ax.imshow(images[i], cmap="gray")
#    ax.set_title("Label: {}".format(labels[i]))
# plt.tight_layout()
# plt.show()
# normalize: 0,255 -> 0,1
x_train, x_test = x_train / 255.0, x_test / 255.0
# model
model = keras.models.Sequential(
    [
        keras.layers.Flatten(input_shape=(28, 28)),
        keras.layers.Dense(128, activation="relu"),
        keras.layers.Dense(10),
    ]
)
# print(y_test)
# print(x_train[0])
# print(model.summary())
# model = keras.Sequential()
# model.add(keras.layers.Flatten(input_shape=(28,28))
# model.add(keras.layers.Dense(128, activation='relu'))
# model.add(keras.layers.Dense(10))
# loss and optimizer
# y = 0, y[1,0,0,0,0,0,0,0,0,0]
loss = keras.losses.SparseCategoricalCrossentropy(from_logits=True)
optim = keras.optimizers.Adam(learning_rate=0.002)  # PLAY AROUND WITH LEARNING RATE!!
metrics = ["accuracy"]
model.compile(loss=loss, optimizer=optim, metrics=metrics)
# training
batch_size = 64
epochs = 7
# fitting
model.fit(
    x_train, y_train, batch_size=batch_size, epochs=epochs, shuffle=True, verbose=2
)
print("")
# evaluation
model.evaluate(x_test, y_test, batch_size=batch_size, verbose=2)


def AIprediction(index):
    # prediction
    probability_model = keras.models.Sequential([model, keras.layers.Softmax()])

    predictions = probability_model(x_test)
    pred0 = predictions[0:100]
    label0 = np.argmax(pred0, axis=1)

    return str(label0[index])
