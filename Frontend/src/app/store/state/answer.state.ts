import { Answer } from '../../models/answerdetail.model';

export const ANSWERS: Answer[] = [
    {
      id: 1,
      questionId: 1,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo, velit at varius tempus, elit elit convallis nulla, non feugiat tortor neque eget velit. Donec interdum rhoncus mi, at ullamcorper lorem lacinia nec.',
      user: 'John',
      votes: 2,
      isAccepted: false
    },
    {
      id: 2,
      questionId: 1,
      body: 'Vestibulum tempus pharetra nulla, at sollicitudin augue feugiat in. Cras non urna non arcu accumsan commodo. Nullam sit amet fermentum velit. Pellentesque pharetra urna a purus ultrices, id rhoncus nisi ullamcorper. Nunc ut tortor elit. Integer facilisis semper magna, vel placerat justo sagittis sit amet.',
      user: 'Alice',
      votes: 1,
      isAccepted: false
    },
    {
      id: 3,
      questionId: 1,
      body: 'Nunc vel fringilla mauris, at rhoncus lorem. Aliquam tincidunt pharetra turpis eu tempus. Praesent et pretium nibh. Duis sollicitudin sodales augue id blandit. Sed in nunc odio. Nulla porttitor diam id purus dapibus efficitur. Vivamus euismod augue sit amet bibendum dignissim. Fusce nec nulla vestibulum, efficitur ex a, dignissim elit.',
      user: 'Bob',
      votes: 0,
      isAccepted: false
    },
  ];
  