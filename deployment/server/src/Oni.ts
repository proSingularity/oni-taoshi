export class Oni {
    public health = 1000;
    public maxHealth = this.health;

    public takeDamage(dmg) {
        this.health -= dmg;
    }
}
