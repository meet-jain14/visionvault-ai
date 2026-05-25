import torch
import open_clip

from PIL import Image

model, _, preprocess = open_clip.create_model_and_transforms(
    "ViT-B-32",
    pretrained="laion2b_s34b_b79k"
)

tokenizer = open_clip.get_tokenizer(
    "ViT-B-32"
)

device = "cuda" if torch.cuda.is_available() else "cpu"

model.to(device)

def generate_image_embedding(
    image_path: str
):

    image = preprocess(
        Image.open(image_path)
    ).unsqueeze(0).to(device)

    with torch.no_grad():

        image_features = model.encode_image(image)

        image_features /= (
            image_features.norm(
                dim=-1,
                keepdim=True
            )
        )

    return image_features[0].cpu().tolist()


def generate_text_embedding(
    text: str
):

    text_tokens = tokenizer(
        [text]
    ).to(device)

    with torch.no_grad():

        text_features = model.encode_text(
            text_tokens
        )

        text_features /= (
            text_features.norm(
                dim=-1,
                keepdim=True
            )
        )

    return text_features[0].cpu().tolist()