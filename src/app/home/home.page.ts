import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public title = "Explore More!"

  public cards = [
    {
      cardImgUrl: 'assets/images/1.jpeg',
      liked: false,
      numOfLikes: 0,
      subTitle: 'Hiking',
      title: 'Climb up a Mountain',
      description: 'Hiking up a mountain is both exhausting and rewarding, you should definitely try it for yourself.'
    },
    {
      cardImgUrl: 'assets/images/2.jpeg',
      liked: false,
      numOfLikes: 5,
      subTitle: 'Trekking',
      title: 'Cross a River',
      description: 'Trekking across rivers with friends is a great way to explore and get exercise'
    },
    {
      cardImgUrl: 'assets/images/3.jpeg',
      liked: false,
      numOfLikes: 20,
      subTitle: 'Sightseeing',
      title: 'Stare into the Distance',
      description: 'Stopping for a moment to take in your surrondings is a must for any adventurer'
    },
    {
      cardImgUrl: 'assets/images/4.jpeg',
      liked: false,
      numOfLikes: 8,
      subTitle: 'Balancing',
      title: 'Cross a Bridge',
      description: 'Walking across a bridge seems pretty simple, but I swear this act is absolutely life changing. I would never lie to you.'
    }
  ]
  
  

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  favoriteCard(cardIndex): void {

    this.cards[cardIndex].liked = !this.cards[cardIndex].liked;

    this.cards[cardIndex].liked ? this.cards[cardIndex].numOfLikes++ : this.cards[cardIndex].numOfLikes--;
  }

  async addCard():  Promise <void> {

    const alert = await this.alertCtrl.create({
      header: "New Card",
      message: "Enter Your Card Info",
      inputs: [
        {
          type: "text",
          name: "cardImgUrl",
          placeholder: "Image Name"
        },
        {
          type: "text",
          name: "title",
          placeholder: "Title"
        },
        {
          type: "text",
          name: "subTitle",
          placeholder: "Sub Title"
        },
        {
          type: "text",
          name: "description",
          placeholder: "Description"
        },
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: async (data) => {
            data.liked = false;
            data.numOfLikes = 0;
            this.cards.push(data);
            this.presentToast();
          },
        }
      ]
    });

    alert.present();

    // let newCardObj = {
    //   cardImgUrl: 'assets/images/4.jpeg',
    //   subTitle: 'Balancing',
    //   title: 'Cross a Bridge',
    //   description: 'Walking across a bridge seems pretty simple, but I swear this act is absolutely life changing. I would never lie to you.'
    // }

    // this.cards.push(newCardObj);
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
        header: 'Post Successful!',
        message: 'Click to Close',
        position: 'bottom',
        buttons: [
          {
            side: 'start',
            icon: 'star',
            text: 'Fav Post',
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });

      await toast.present();
  
      const { role } = await toast.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
  }
}
