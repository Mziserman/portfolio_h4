class HomeController < ApplicationController
  def index
    @projects = Project.all
    @offer = Offer.new
  end

  def create_offer
    @offer = Offer.new(params.require(:offer).permit(:title,
      :entreprise, :url, :message))
    if @offer.save
      flash[:success] = "Thank you for the offer. I will get in touch with you as soon as possible."
      redirect_to action: :index
    else
      puts @offer.errors.inspect
    end
  end
end
