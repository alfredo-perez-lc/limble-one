// import { InjectRepository } from '@nestjs/typeorm';
// import { Phrase } from '../entities/phrase.entity';
// import { Repository } from 'typeorm';
// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
//
// @ValidatorConstraint({ async: true })
// export class IsUniqueKey implements ValidatorConstraintInterface {
//   constructor(
//     @InjectRepository(Phrase)
//     private phraseRepository: Repository<Phrase>
//   ) {}
//
//   validate(key: string) {
//     return this.phraseRepository
//       .find({
//         where: { key },
//       })
//       .then((phrases) => {
//         console.log(`Phrases found in validation: ${phrases}`);
//         const isValid = phrases === undefined || phrases.length === 0;
//         console.info(`Is valid: ${isValid}`);
//         return isValid;
//       });
//   }
// }
//
// export function UniquePhraseKey(validationOptions?: ValidationOptions) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsUniqueKey,
//     });
//   };
// }
